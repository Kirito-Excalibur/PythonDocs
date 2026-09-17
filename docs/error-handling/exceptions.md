# Exceptions

An **exception** is Python's way of signaling that something went wrong while a program was running. Instead of crashing silently or returning a mysterious value, Python raises an exception with a specific type and message.

## Seeing an exception happen

```python
numbers = [1, 2, 3]
print(numbers[10])
```

```
Traceback (most recent call last):
  File "example.py", line 2, in <module>
    print(numbers[10])
IndexError: list index out of range
```

This is called a **traceback** — it shows exactly where the error occurred and the chain of calls that led there. `IndexError` is the exception **type**; `list index out of range` is the message describing what went wrong.

## Common built-in exception types

```python
int("abc")           # ValueError: invalid literal for int() with base 10: 'abc'
1 / 0                 # ZeroDivisionError: division by zero
[1, 2][5]              # IndexError: list index out of range
{"a": 1}["b"]          # KeyError: 'b'
None.upper()           # AttributeError: 'NoneType' object has no attribute 'upper'
"5" + 5                # TypeError: can only concatenate str (not "int") to str
undefined_variable     # NameError: name 'undefined_variable' is not defined
open("missing.txt")    # FileNotFoundError: [Errno 2] No such file or directory
import nonexistent     # ModuleNotFoundError: No module named 'nonexistent'
```

Recognizing these by name makes tracebacks far faster to read and debug.

## The exception hierarchy

Every built-in exception inherits from `BaseException`, and almost all of them inherit from `Exception` specifically:

```
BaseException
 ├── SystemExit
 ├── KeyboardInterrupt
 └── Exception
      ├── ArithmeticError
      │    └── ZeroDivisionError
      ├── LookupError
      │    ├── IndexError
      │    └── KeyError
      ├── ValueError
      ├── TypeError
      ├── AttributeError
      ├── NameError
      ├── OSError
      │    └── FileNotFoundError
      └── ...
```

This hierarchy matters when you `except` an exception — catching `LookupError` also catches both `IndexError` and `KeyError`, since they're both subclasses of it. Catching `Exception` catches nearly everything (deliberately excluding `SystemExit` and `KeyboardInterrupt`, so `Ctrl+C` and a clean program exit still work as expected even if you have a broad `except`).

## What happens if an exception isn't caught

If nothing handles it, an exception propagates all the way up and **crashes the program**, printing a traceback:

```python
def divide(a, b):
    return a / b

print("Before")
print(divide(10, 0))   # crashes here
print("After")          # never runs
```

```
Before
Traceback (most recent call last):
  ...
ZeroDivisionError: division by zero
```

The fix is to *catch* the exception where you can meaningfully handle it — covered next in [try / except / finally](/error-handling/try-except-finally).

## Raising your own exceptions

Use `raise` to trigger an exception deliberately, typically to enforce that a function's inputs make sense:

```python
def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

set_age(-5)
```

```
ValueError: Age cannot be negative
```

This is a fundamental Python idiom: **fail loudly and immediately** when something is invalid, rather than silently continuing with bad data that will cause a more confusing failure later.

**Next up:** [try / except / finally →](/error-handling/try-except-finally)
