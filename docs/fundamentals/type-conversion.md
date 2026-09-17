# Type Conversion

Python is **strongly typed**: it never silently converts one type to another for you. `"5" + 5` raises an error rather than guessing what you meant. You have to convert explicitly, using the type's name as a function.

## Explicit conversion

```python
print(int("42"))        # 42     str -> int
print(int(3.99))        # 3      float -> int (truncates)
print(float("3.14"))    # 3.14   str -> float
print(str(42))          # "42"   int -> str
print(bool(0))          # False
print(bool(1))          # True
print(bool(""))         # False
print(bool("hello"))    # True
```

## Why you need this

```python
age = input("Enter your age: ")   # input() ALWAYS returns a str
print(type(age))                   # <class 'str'>

# age + 1  would raise: TypeError: can only concatenate str (not "int") to str

age = int(age)
print(age + 1)   # works now
```

(`input()` is covered in [User Input & Output](/fundamentals/input-output).)

## Conversions that can fail

```python
int("hello")     # ValueError: invalid literal for int() with base 10: 'hello'
int("3.14")      # ValueError — int() can't parse a decimal point directly
float("3.14")    # 3.14 — this works fine
int(float("3.14"))  # 3 — convert to float first, then to int
```

Because these conversions can raise errors, it's common to wrap them in a `try`/`except` block (covered fully in [Exceptions](/error-handling/exceptions)):

```python
user_input = "abc"

try:
    number = int(user_input)
except ValueError:
    print("That's not a valid number!")
```

```
That's not a valid number!
```

## Implicit conversion (type coercion)

Python *does* automatically convert numeric types in mixed arithmetic — this is fine because no information is lost:

```python
result = 5 + 2.0
print(result)        # 7.0
print(type(result))  # <class 'float'>

print(True + 1)      # 2   (bool -> int)
```

This only happens between compatible numeric types (`int`, `float`, `bool`, `complex`) — never automatically between `str` and numbers.

## Converting between collections

You'll see this pattern often once you reach [Data Structures](/data-structures/lists):

```python
print(list("abc"))          # ['a', 'b', 'c']
print(tuple([1, 2, 3]))     # (1, 2, 3)
print(set([1, 2, 2, 3]))    # {1, 2, 3}  (duplicates removed)
print(list({"a": 1, "b": 2}))  # ['a', 'b']  (keys only)
```

**Next up:** [Operators →](/fundamentals/operators)
