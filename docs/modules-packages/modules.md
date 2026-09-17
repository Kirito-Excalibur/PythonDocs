# Modules

A **module** is simply a `.py` file — any Python file can be imported and reused from another file. Modules are how Python organizes code beyond a single script.

## Creating and importing a module

`math_utils.py`:

```python
# math_utils.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

PI = 3.14159
```

`main.py`, in the same directory:

```python
# main.py
import math_utils

print(math_utils.add(2, 3))       # 5
print(math_utils.PI)              # 3.14159
```

`import math_utils` makes everything in `math_utils.py` accessible through the `math_utils.` prefix.

## Different import styles

```python
import math_utils
math_utils.add(2, 3)

from math_utils import add
add(2, 3)                          # no prefix needed

from math_utils import add, PI
add(2, 3)
print(PI)

from math_utils import add as sum_two
sum_two(2, 3)

import math_utils as mu
mu.add(2, 3)
```

::: warning Careful! Avoid `from module import *`
```python
from math_utils import *
```
This dumps every public name from `math_utils` directly into your current namespace. It's convenient, but makes it unclear where any given name came from when reading the code later, and can silently overwrite names you already have. Prefer explicit imports.
:::

## The standard library

Python ships with a huge collection of built-in modules — no installation needed:

```python
import math
import random
import datetime
import json
import os

print(math.sqrt(16))               # 4.0
print(random.randint(1, 6))        # a random number 1-6
```

Chapter 9, [Standard Library Tour](/standard-library/datetime), covers the most useful ones in depth.

## `if __name__ == "__main__":`

Every module has a special `__name__` variable. When a file is run **directly**, `__name__` equals `"__main__"`. When it's **imported** by another file, `__name__` equals the module's actual name instead:

```python
# math_utils.py
def add(a, b):
    return a + b

def run_tests():
    print(add(2, 3))
    print(add(-1, 1))

if __name__ == "__main__":
    run_tests()
```

Running `python3 math_utils.py` directly executes `run_tests()`. But `import math_utils` from elsewhere does **not** run `run_tests()` — only the function/variable definitions happen. This is the standard way to make a file work both as a reusable module and as a standalone script.

## Where Python looks for modules

When you `import something`, Python searches, in order:

1. The directory of the script being run.
2. Directories listed in the `PYTHONPATH` environment variable, if set.
3. The standard library's installation directories.
4. Installed third-party packages (site-packages).

You can inspect this search path:

```python
import sys
print(sys.path)
```

## Reloading and caching

Once a module is imported anywhere in a running program, Python caches it — importing it again elsewhere in the same run reuses the cached version instead of re-executing the file:

```python
import math_utils   # runs the file, caches the result
import math_utils   # does nothing — already cached
```

This is why top-level `print()` statements in a module (outside any function) only ever run once, no matter how many times it's imported across your codebase.

**Next up:** [Packages →](/modules-packages/packages)
