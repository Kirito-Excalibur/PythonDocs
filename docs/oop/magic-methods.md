# Magic Methods

Magic methods (also called "dunder" methods, short for **d**ouble **under**score) are special methods with names like `__init__` and `__str__` that let your objects integrate with Python's built-in syntax — `print()`, `+`, `len()`, `==`, `for` loops, and more. You've already met `__init__`, `__str__`, `__iter__`, and `__next__`; here's the fuller picture.

## String representation: `__str__` and `__repr__`

```python
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __str__(self):
        """Used by print() and str() — a friendly, readable form."""
        return f"({self.x}, {self.y})"

    def __repr__(self):
        """Used in the REPL, inside lists, and by repr() — an unambiguous form,
        ideally one that could recreate the object."""
        return f"Point(x={self.x}, y={self.y})"

p = Point(3, 4)
print(p)          # (3, 4)              -- uses __str__
print(repr(p))    # Point(x=3, y=4)     -- uses __repr__
print([p])         # [Point(x=3, y=4)]   -- lists always use __repr__ on their items
```

::: tip
If you only define one, define `__repr__` — Python falls back to it for `str()` if `__str__` is missing, but not the other way around. A good `__repr__` also makes debugging in the REPL much more pleasant.
:::

## Equality: `__eq__`

Without it, `==` compares by identity (the same as `is`) — even two objects with identical data count as unequal:

```python
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

p1 = Point(1, 2)
p2 = Point(1, 2)
print(p1 == p2)   # False — different objects, no __eq__ defined

class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

p1 = Point(1, 2)
p2 = Point(1, 2)
print(p1 == p2)   # True — compares by VALUE now
```

## Arithmetic operators: `__add__`, `__sub__`, `__mul__`, ...

```python
class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)   # Vector(4, 6)
print(v1 - v2)   # Vector(-2, -2)
print(v1 * 3)    # Vector(3, 6)
```

## Length and container behavior: `__len__`, `__getitem__`, `__contains__`

```python
class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __len__(self):
        return len(self.songs)

    def __getitem__(self, index):
        return self.songs[index]

    def __contains__(self, song):
        return song in self.songs

playlist = Playlist(["Song A", "Song B", "Song C"])
print(len(playlist))         # 3            -- powers len()
print(playlist[1])            # Song B       -- powers playlist[1]
print("Song A" in playlist)   # True         -- powers the `in` operator

for song in playlist:          # __getitem__ alone is enough to make it iterable!
    print(song)
```

## Making an object callable: `__call__`

```python
class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, value):
        return value * self.factor

double = Multiplier(2)
print(double(5))   # 10 -- calling double(5) like a function
```

## Context manager protocol: `__enter__` and `__exit__`

Powers the `with` statement — full details in [Context Managers](/error-handling/context-managers):

```python
class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        import time
        print(f"Elapsed: {time.time() - self.start:.4f}s")

with Timer():
    total = sum(range(1_000_000))
```

## A few of the most common magic methods, at a glance

| Method | Triggered by |
|---|---|
| `__init__` | Creating an instance: `MyClass()` |
| `__str__` | `str(obj)`, `print(obj)` |
| `__repr__` | `repr(obj)`, the REPL, inside containers |
| `__eq__` | `obj1 == obj2` |
| `__lt__` | `obj1 < obj2` (also used by `sorted()`) |
| `__len__` | `len(obj)` |
| `__getitem__` | `obj[key]` |
| `__iter__` | `for x in obj` |
| `__call__` | `obj(...)` |
| `__enter__` / `__exit__` | `with obj:` |

::: tip
You'll never need all of these on any single class. Implement only the ones that make your object behave sensibly with the operations you actually want to support.
:::

**Next up:** [Static & Class Methods →](/oop/class-static-methods)
