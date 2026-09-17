# Working with Paths

Building file paths by concatenating strings (`"folder" + "/" + "file.txt"`) is fragile — it breaks on Windows, where paths use backslashes. The modern, recommended tool is `pathlib`.

## Creating a `Path`

```python
from pathlib import Path

p = Path("data/notes.txt")
print(p)              # data/notes.txt
print(type(p))         # <class 'pathlib.PosixPath'> (or WindowsPath on Windows)
```

`pathlib` automatically uses the correct separator for whichever operating system the code is running on — you never write `/` or `\` yourself.

## Joining paths with `/`

```python
from pathlib import Path

folder = Path("data")
file_path = folder / "notes.txt"
print(file_path)   # data/notes.txt

nested = Path("project") / "src" / "utils" / "helpers.py"
print(nested)   # project/src/utils/helpers.py
```

The `/` operator is overloaded specifically for this — it's one of Python's clearest examples of [operator overloading](/oop/polymorphism) in the standard library.

## Useful `Path` properties

```python
from pathlib import Path

p = Path("/home/user/documents/report.pdf")

print(p.name)        # report.pdf
print(p.stem)        # report        (filename without extension)
print(p.suffix)      # .pdf
print(p.parent)      # /home/user/documents
print(p.parts)       # ('/', 'home', 'user', 'documents', 'report.pdf')
print(p.is_absolute())  # True
```

## Checking existence and type

```python
from pathlib import Path

p = Path("notes.txt")

print(p.exists())     # True/False
print(p.is_file())     # True/False
print(p.is_dir())      # True/False
```

## Reading and writing without a manual `open()`

`Path` objects have convenience methods for simple cases:

```python
from pathlib import Path

p = Path("notes.txt")

p.write_text("Hello, file!\n", encoding="utf-8")
contents = p.read_text(encoding="utf-8")
print(contents)  # Hello, file!
```

`Path` objects also work directly with `open()` for anything more involved:

```python
with open(p) as f:
    print(f.read())
```

## Creating directories

```python
from pathlib import Path

Path("data/cache").mkdir(parents=True, exist_ok=True)
```

- `parents=True` creates any missing parent directories too (like `mkdir -p`).
- `exist_ok=True` prevents an error if the directory already exists.

## Listing directory contents

```python
from pathlib import Path

folder = Path(".")

for item in folder.iterdir():
    print(item)

for py_file in folder.glob("*.py"):        # only files matching a pattern
    print(py_file)

for py_file in folder.rglob("*.py"):       # recursive — includes subdirectories
    print(py_file)
```

## Building paths relative to your script

A very common real-world need: reference a file relative to the script itself, regardless of the current working directory the script happens to be run from:

```python
from pathlib import Path

script_dir = Path(__file__).parent
config_path = script_dir / "config.json"
```

`__file__` holds the path to the currently executing script; `.parent` gets its containing directory.

## The old way: `os.path`

You'll still see this in a lot of existing code, especially older tutorials and libraries:

```python
import os

path = os.path.join("data", "notes.txt")
print(os.path.exists(path))
print(os.path.basename(path))   # notes.txt
print(os.path.dirname(path))    # data
```

`os.path` works with plain strings rather than a dedicated `Path` object. `pathlib` is generally considered more readable and is the recommended choice for new code, but `os.path` remains extremely common, so it's worth being able to read.

**Next up:** [JSON and CSV →](/files-io/json-and-csv)
