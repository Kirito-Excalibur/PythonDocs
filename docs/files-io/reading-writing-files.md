# Reading & Writing Files

## Opening a file with `with`

Always use the `with` statement (a [context manager](/error-handling/context-managers)) so the file is closed automatically, even if an error occurs:

```python
with open("notes.txt") as f:
    contents = f.read()

print(contents)
```

## File modes

```python
open("file.txt", "r")   # read (default) — errors if the file doesn't exist
open("file.txt", "w")   # write — creates the file, OVERWRITES existing contents
open("file.txt", "a")   # append — creates the file, adds to the end
open("file.txt", "x")   # exclusive create — errors if the file already exists
open("file.bin", "rb")  # read in binary mode
open("file.bin", "wb")  # write in binary mode
```

::: warning Careful! `"w"` mode erases the existing file immediately
The moment you `open("file.txt", "w")`, the file is truncated to empty — before you've written anything. If you meant to add to a file rather than replace it, use `"a"` instead.
:::

## Reading a whole file

```python
with open("notes.txt") as f:
    contents = f.read()   # returns the ENTIRE file as one string
```

## Reading line by line

```python
with open("notes.txt") as f:
    for line in f:              # memory-efficient — reads one line at a time
        print(line.strip())      # .strip() removes the trailing newline
```

```python
with open("notes.txt") as f:
    lines = f.readlines()   # returns a LIST of lines (loads the whole file)
    print(lines)              # ['first line\n', 'second line\n']
```

::: tip
Prefer looping directly over the file object (`for line in f:`) for large files — it reads lazily, one line at a time, rather than loading everything into memory at once like `.read()` or `.readlines()` do. This connects directly to the laziness idea from [Generators](/functions-deep-dive/generators).
:::

## Writing to a file

```python
with open("output.txt", "w") as f:
    f.write("Hello, file!\n")
    f.write("Second line\n")
```

```python
lines = ["First\n", "Second\n", "Third\n"]
with open("output.txt", "w") as f:
    f.writelines(lines)   # does NOT add newlines automatically — include them yourself
```

## Appending to a file

```python
with open("log.txt", "a") as f:
    f.write("New log entry\n")
```

Running this multiple times keeps adding new lines, rather than overwriting the file each time.

## Checking whether a file exists first

```python
import os

if os.path.exists("notes.txt"):
    with open("notes.txt") as f:
        print(f.read())
else:
    print("File not found")
```

Or, more idiomatically in Python, just try it and handle the failure (see [Exceptions](/error-handling/exceptions)) — this avoids a "check, then act" race condition and is generally the preferred style:

```python
try:
    with open("notes.txt") as f:
        print(f.read())
except FileNotFoundError:
    print("File not found")
```

## Specifying text encoding

Always be explicit about encoding when working with non-ASCII text, to avoid platform-dependent surprises:

```python
with open("notes.txt", encoding="utf-8") as f:
    contents = f.read()

with open("output.txt", "w", encoding="utf-8") as f:
    f.write("Héllo, wörld! 你好")
```

**Next up:** [Working with Paths →](/files-io/working-with-paths)
