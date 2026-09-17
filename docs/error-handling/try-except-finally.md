# try / except / finally

The `try` statement lets you catch an exception and handle it gracefully, instead of letting it crash the program.

## Basic `try`/`except`

```python
try:
    number = int(input("Enter a number: "))
    print(f"You entered {number}")
except ValueError:
    print("That wasn't a valid number!")
```

```
Enter a number: abc
That wasn't a valid number!
```

The code in `try` runs first. If it raises an exception matching the type listed in `except`, control jumps to that block instead of crashing. If no exception occurs, `except` is skipped entirely.

## Catching specific exception types

Always catch the **most specific** exception type you can, rather than a broad catch-all — it prevents accidentally swallowing bugs you didn't anticipate:

```python
try:
    result = 10 / int(input("Divide 10 by: "))
    print(result)
except ZeroDivisionError:
    print("Can't divide by zero!")
except ValueError:
    print("That's not a valid number!")
```

```
Divide 10 by: 0
Can't divide by zero!
```

Multiple `except` blocks are checked top to bottom; the first matching type handles the exception.

## Catching multiple types in one block

```python
try:
    risky_operation()
except (ValueError, TypeError) as e:
    print(f"Something went wrong: {e}")
```

`as e` binds the exception instance to a name, letting you inspect its message or other attributes.

## `except Exception` — a last resort

```python
try:
    risky_operation()
except Exception as e:
    print(f"Unexpected error: {e}")
```

::: warning Careful! Avoid bare `except:`
```python
try:
    risky_operation()
except:   # catches EVERYTHING, including Ctrl+C and system exit signals
    pass
```
A bare `except:` (with no type at all) also catches `KeyboardInterrupt` and `SystemExit`, making your program impossible to stop cleanly with `Ctrl+C`, and it silently hides bugs you never intended to catch. Always specify at least `except Exception:`, and ideally the exact type you expect.
:::

## The `else` clause

Code in `else` runs **only if the `try` block succeeded with no exception** — useful for separating "the risky part" from "what to do once it worked":

```python
try:
    number = int(input("Enter a number: "))
except ValueError:
    print("Invalid input")
else:
    print(f"Great, you entered {number}")
    print(f"Its square is {number ** 2}")
```

## The `finally` clause

Code in `finally` **always** runs, whether or not an exception occurred — commonly used for cleanup like closing a file or a network connection:

```python
try:
    file = open("data.txt")
    contents = file.read()
except FileNotFoundError:
    print("File not found")
finally:
    print("Cleanup happens no matter what")
```

```
File not found
Cleanup happens no matter what
```

::: tip
For files specifically, the `with` statement (a [context manager](/error-handling/context-managers)) handles this cleanup automatically and is the idiomatic choice — you'll rarely need to manually pair `open()` with a `finally: file.close()`.
:::

## Putting it all together

```python
def read_number_from_file(path):
    try:
        with open(path) as f:
            return int(f.read().strip())
    except FileNotFoundError:
        print(f"{path} does not exist")
        return None
    except ValueError:
        print(f"{path} does not contain a valid number")
        return None
    else:
        print("Read successfully")
    finally:
        print("Done attempting to read")
```

## Inspecting the exception object

```python
try:
    1 / 0
except ZeroDivisionError as e:
    print(type(e))       # <class 'ZeroDivisionError'>
    print(str(e))          # division by zero
    print(e.args)           # ('division by zero',)
```

**Next up:** [Custom Exceptions →](/error-handling/custom-exceptions)
