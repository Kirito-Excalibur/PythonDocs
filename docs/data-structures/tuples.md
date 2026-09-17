# Tuples

A `tuple` is an ordered collection, just like a list, but **immutable** — once created, it cannot be changed.

## Creating a tuple

```python
point = (3, 4)
colors = "red", "green", "blue"    # parentheses are optional
single = (5,)                       # trailing comma required for a one-item tuple!
empty = ()
```

::: warning Careful! The one-item tuple trap
```python
not_a_tuple = (5)
print(type(not_a_tuple))   # <class 'int'> — this is just 5 in parentheses

actual_tuple = (5,)
print(type(actual_tuple))  # <class 'tuple'>
```
The comma is what makes it a tuple, not the parentheses.
:::

## Tuples are immutable

```python
point = (3, 4)
point[0] = 10   # TypeError: 'tuple' object does not support item assignment
```

Once created, you cannot add, remove, or reassign elements. To "change" a tuple, you create a new one.

## Indexing and slicing

Works exactly like lists and strings:

```python
point = (3, 4, 5)
print(point[0])    # 3
print(point[-1])   # 5
print(point[1:])   # (4, 5)
```

## Why use a tuple instead of a list?

1. **Intent** — a tuple signals "this data is a fixed record that shouldn't change," e.g. a coordinate `(x, y)` or an RGB color `(255, 0, 0)`.
2. **Safety** — since it can't be mutated, it can't be accidentally modified by code that receives it.
3. **Hashability** — tuples (of hashable items) can be used as dictionary keys or set members; lists cannot:

```python
locations = {
    (40.7, -74.0): "New York",
    (51.5, -0.1): "London",
}
print(locations[(40.7, -74.0)])  # New York

# {["a", "list"]: "value"}   # TypeError: unhashable type: 'list'
```

## Unpacking a tuple

```python
point = (3, 4)
x, y = point
print(x, y)  # 3 4
```

This is used constantly, including for functions that return multiple values:

```python
def min_max(numbers):
    return min(numbers), max(numbers)   # actually returns a tuple

lowest, highest = min_max([4, 1, 9, 3])
print(lowest, highest)  # 1 9
```

Full details on unpacking patterns (including `*rest`) are in [Unpacking](/data-structures/unpacking).

## Tuple methods

Tuples have far fewer methods than lists, since they can't be modified:

```python
point = (3, 4, 3, 5, 3)
print(point.count(3))   # 3 — how many times 3 appears
print(point.index(4))   # 1 — index of first match
print(len(point))        # 5
```

## `namedtuple` — tuples with named fields

For a lightweight, immutable record with readable field names, use `collections.namedtuple`:

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)

print(p.x, p.y)   # 3 4
print(p[0], p[1]) # 3 4  — still works like a regular tuple
```

For more modern code, `typing.NamedTuple` or a `@dataclass` (see [Dataclasses](/advanced/dataclasses)) is often preferred, but `namedtuple` is still common in existing codebases and the standard library itself.

**Next up:** [Dictionaries →](/data-structures/dictionaries)
