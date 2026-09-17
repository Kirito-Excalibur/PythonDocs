# Packages

A **package** is a directory of modules, allowing you to organize related code into a folder hierarchy instead of one flat pile of `.py` files.

## A basic package structure

```
myapp/
├── main.py
└── shapes/
    ├── __init__.py
    ├── circle.py
    └── square.py
```

`shapes/circle.py`:

```python
# shapes/circle.py
class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2
```

`shapes/square.py`:

```python
# shapes/square.py
class Square:
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2
```

`main.py`:

```python
# main.py
from shapes.circle import Circle
from shapes.square import Square

c = Circle(5)
s = Square(4)
print(c.area())  # 78.53975
print(s.area())  # 16
```

## What `__init__.py` does

An `__init__.py` file (which can be empty) marks a directory as a package, making it importable with dotted syntax like `shapes.circle`. Since Python 3.3, truly empty directories can technically still be imported as "namespace packages" without `__init__.py`, but including it explicitly remains the clear, conventional choice — and it's also the place to define what a package exposes.

`shapes/__init__.py`:

```python
# shapes/__init__.py
from .circle import Circle
from .square import Square
```

With this, `main.py` can import more directly from the package itself:

```python
from shapes import Circle, Square   # no need to reference the submodule names
```

## Relative imports within a package

Inside a package, modules can import from their siblings using a leading dot:

```python
# shapes/__init__.py
from .circle import Circle    # "." means "this same package"
from .square import Square
```

`..` would mean "the parent package," for deeper nested structures. Relative imports only work inside a package — never in a standalone script run directly.

## Nested packages

Packages can contain other packages, to any depth:

```
myapp/
├── main.py
└── shapes/
    ├── __init__.py
    ├── circle.py
    └── three_d/
        ├── __init__.py
        └── sphere.py
```

```python
from shapes.three_d.sphere import Sphere
```

## Absolute vs. relative imports

```python
# Absolute — spells out the full path from the project root
from shapes.circle import Circle

# Relative — relative to the current module's location
from .circle import Circle
```

::: tip
Prefer absolute imports for clarity in application code — they read the same no matter which file you're looking at. Relative imports are more common inside self-contained, reusable packages/libraries, where the internal structure might move around as a unit.
:::

## Running a package's module directly

Running a file inside a package with `python3 shapes/circle.py` breaks relative imports (`__name__` becomes `"__main__"`, so Python doesn't know it's part of `shapes`). Instead, run it as a module with `-m`, from the project root:

```bash
python3 -m shapes.circle
```

**Next up:** [Virtual Environments →](/modules-packages/virtual-environments)
