# Unpacking

Unpacking lets you assign multiple values from a sequence to multiple variable names in one line.

## Basic unpacking

```python
point = (3, 4)
x, y = point
print(x, y)  # 3 4
```

The number of variables must match the number of items, or Python raises a `ValueError`:

```python
a, b = (1, 2, 3)   # ValueError: too many values to unpack (expected 2)
```

## Unpacking works on any iterable

```python
first, second, third = [1, 2, 3]
print(first, second, third)  # 1 2 3

a, b, c = "xyz"
print(a, b, c)  # x y z
```

## The "star" (`*`) operator for flexible unpacking

Use `*name` to collect "everything else" into a list:

```python
numbers = [1, 2, 3, 4, 5]

first, *middle, last = numbers
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5
```

```python
first, *rest = numbers
print(first)  # 1
print(rest)   # [2, 3, 4, 5]

*rest, last = numbers
print(rest)  # [1, 2, 3, 4]
print(last)  # 5
```

Only one `*name` is allowed per unpacking assignment.

## Swapping variables

Python's unpacking makes swapping trivial, without a temporary variable:

```python
a, b = 1, 2
a, b = b, a
print(a, b)  # 2 1
```

The right-hand side `b, a` is built into a tuple first, then unpacked into `a, b`.

## Ignoring values with `_`

By convention, `_` is used as a throwaway variable name for values you don't care about:

```python
point = (3, 4, 0)
x, y, _ = point   # we don't need the third value
print(x, y)  # 3 4
```

## Unpacking in function calls

The `*` operator also **spreads** an iterable into separate positional arguments, and `**` spreads a dict into keyword arguments:

```python
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
print(add(*numbers))   # 6  — same as add(1, 2, 3)

kwargs = {"a": 1, "b": 2, "c": 3}
print(add(**kwargs))    # 6  — same as add(a=1, b=2, c=3)
```

This is the flip side of `*args`/`**kwargs` in function *definitions* — see [*args and **kwargs](/functions-deep-dive/args-kwargs) for that half of the picture.

## Unpacking in a `for` loop

Very common when looping over pairs, like `dict.items()` or `enumerate()`:

```python
pairs = [("a", 1), ("b", 2), ("c", 3)]

for letter, number in pairs:
    print(letter, number)
```

```
a 1
b 2
c 3
```

## Merging collections with `*` and `**`

```python
a = [1, 2, 3]
b = [4, 5, 6]
combined = [*a, *b]
print(combined)  # [1, 2, 3, 4, 5, 6]

defaults = {"theme": "light"}
overrides = {"font_size": 14}
merged = {**defaults, **overrides}
print(merged)  # {'theme': 'light', 'font_size': 14}
```

**Next up:** [Nested Data Structures →](/data-structures/nested-data-structures)
