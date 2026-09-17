# Data Types

Every value in Python has a type. The type determines what operations are valid on that value and how it behaves.

## Checking a type

Use the built-in `type()` function:

```python
print(type(42))          # <class 'int'>
print(type(3.14))        # <class 'float'>
print(type("hello"))     # <class 'str'>
print(type(True))        # <class 'bool'>
print(type(None))        # <class 'NoneType'>
print(type([1, 2, 3]))   # <class 'list'>
```

## The built-in types at a glance

| Category | Type | Example |
|---|---|---|
| Numeric | `int` | `42`, `-7`, `0` |
| Numeric | `float` | `3.14`, `-0.5`, `2.0` |
| Numeric | `complex` | `2 + 3j` |
| Text | `str` | `"hello"` |
| Boolean | `bool` | `True`, `False` |
| Sequence | `list` | `[1, 2, 3]` |
| Sequence | `tuple` | `(1, 2, 3)` |
| Mapping | `dict` | `{"key": "value"}` |
| Set | `set` | `{1, 2, 3}` |
| None | `NoneType` | `None` |

This chapter covers numbers, strings, and booleans in detail on their own pages. Lists, tuples, dictionaries, and sets get a full chapter of their own: [Data Structures](/data-structures/lists).

## `None`

`None` is Python's way of representing "no value" or "nothing here." It's its own type, `NoneType`, and there is exactly one `None` value in existence.

```python
result = None
print(result)          # None
print(result is None)  # True
```

It's commonly used as a placeholder — for example, a function that doesn't explicitly `return` anything returns `None` automatically:

```python
def say_hi():
    print("hi")

output = say_hi()
print(output)  # hi
               # None
```

::: tip
Always compare to `None` using `is`, not `==`: write `if x is None`, not `if x == None`. This is a strong Python convention because `is` checks *identity* (is it literally the same object?), which is exactly what you want for a singleton like `None`.
:::

## Booleans

`bool` has exactly two values: `True` and `False`. They're actually a subtype of `int` — `True` behaves like `1` and `False` like `0`:

```python
print(True + True)   # 2
print(False == 0)    # True
print(True == 1)     # True
```

Booleans are the result of comparisons and are used everywhere in conditionals:

```python
print(5 > 3)       # True
print(5 == "5")    # False (different types, no implicit conversion)
```

## Truthiness

Every value in Python is either "truthy" or "falsy" when evaluated in a boolean context (like an `if` statement). The falsy values are:

```
False   None    0    0.0    ""    []    {}    ()    set()
```

Everything else is truthy. This means you'll often see:

```python
names = []

if names:
    print("We have names!")
else:
    print("The list is empty")
```

```
The list is empty
```

instead of the more verbose `if len(names) > 0:`. This idiom is extremely common in real Python code.

## Mutable vs immutable types

This distinction matters a lot in Python and will come up repeatedly:

- **Immutable** (cannot be changed after creation): `int`, `float`, `str`, `bool`, `tuple`
- **Mutable** (can be changed in place): `list`, `dict`, `set`

```python
# Strings are immutable — this creates a NEW string, it doesn't modify the original
name = "python"
upper_name = name.upper()
print(name)         # python (unchanged)
print(upper_name)   # PYTHON

# Lists are mutable — this modifies the SAME list
numbers = [1, 2, 3]
numbers.append(4)
print(numbers)  # [1, 2, 3, 4]
```

We'll come back to why this matters a great deal once we cover function arguments and object references.

**Next up:** [Numbers →](/fundamentals/numbers)
