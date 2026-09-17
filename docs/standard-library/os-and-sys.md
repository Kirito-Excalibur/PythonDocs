# os and sys

`os` and `sys` are two of the most fundamental standard library modules — they let your program interact with the operating system and the interpreter that's running it.

## `sys` — the interpreter and runtime environment

### Command-line arguments

```python
# script.py
import sys

print(sys.argv)
```

```bash
python3 script.py hello world
```

```
['script.py', 'hello', 'world']
```

`sys.argv` is a list of strings: the script's own name, followed by every argument passed on the command line.

```python
import sys

if len(sys.argv) < 2:
    print("Usage: python3 script.py <name>")
    sys.exit(1)          # exit with a non-zero status code, signaling an error

name = sys.argv[1]
print(f"Hello, {name}!")
```

::: tip
For anything beyond a couple of simple positional arguments, use the standard library's `argparse` module instead of parsing `sys.argv` manually — it handles flags, help text, and validation for you.
:::

### Exiting a program

```python
import sys

sys.exit()      # exit with status 0 (success)
sys.exit(1)      # exit with a non-zero status (indicates failure to the shell)
sys.exit("Something went wrong")   # prints the message to stderr, exits with status 1
```

### The module search path

```python
import sys
print(sys.path)   # list of directories Python searches when importing
```

### Printing to stderr

```python
import sys
print("An error occurred", file=sys.stderr)
```

### Python version info

```python
import sys
print(sys.version)         # full version string
print(sys.version_info)    # sys.version_info(major=3, minor=12, micro=4, ...)
```

## `os` — the operating system interface

### Environment variables

```python
import os

print(os.environ.get("HOME"))          # e.g. /home/username
print(os.environ.get("MY_API_KEY", "default_value"))

os.environ["DEBUG"] = "1"               # set for the current process only
```

Environment variables are the standard way to configure an application without hard-coding secrets (like API keys) directly in source code.

### Working with the current directory

```python
import os

print(os.getcwd())        # the current working directory
os.chdir("/tmp")           # change the current working directory
```

### Listing directory contents

```python
import os

print(os.listdir("."))   # plain list of names in the current directory
```

::: tip
For anything beyond a flat listing — joining paths, checking file types, recursive walks — prefer `pathlib` (see [Working with Paths](/files-io/working-with-paths)). `os` and `os.path` are still extremely common in existing code and worth recognizing, but `pathlib`'s object-oriented interface is generally considered more readable for new code.
:::

### Running a shell command

```python
import subprocess

result = subprocess.run(["ls", "-la"], capture_output=True, text=True)
print(result.stdout)
print(result.returncode)   # 0 usually means success
```

::: warning Careful! Never build shell commands from untrusted input
```python
# DANGEROUS if user_input comes from an untrusted source
os.system(f"ls {user_input}")
```
This is vulnerable to shell injection — a malicious `user_input` like `"; rm -rf ."` could execute arbitrary commands. Use `subprocess.run()` with a list of arguments (as shown above) rather than `os.system()` with a formatted string, and never set `shell=True` unless you fully control the command being constructed.
:::

### Creating and removing directories

```python
import os

os.mkdir("new_folder")               # fails if it already exists
os.makedirs("a/b/c", exist_ok=True)  # creates nested directories, no error if they exist

os.rmdir("new_folder")                # only works on EMPTY directories
```

(`pathlib`'s `Path.mkdir(parents=True, exist_ok=True)` covers the same need with the more modern interface.)

This wraps up the standard library tour. Next, we'll look at how Python handles concurrency — running multiple things at once.

**Next up:** Chapter 10 — [Threading & Multiprocessing →](/concurrency/threading-and-multiprocessing)
