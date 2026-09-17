# Debugging

Bugs are inevitable. Python gives you several tools for finding out what's actually happening inside a program, ranging from "print statements" to a full interactive debugger.

## Reading a traceback

When a program crashes, the traceback is your primary clue. Read it **from the bottom up**:

```python
def divide(a, b):
    return a / b

def calculate():
    return divide(10, 0)

calculate()
```

```
Traceback (most recent call last):
  File "script.py", line 6, in <module>
    calculate()
  File "script.py", line 4, in calculate
    return divide(10, 0)
  File "script.py", line 2, in divide
    return a / b
ZeroDivisionError: division by zero
```

- The **last line** tells you the exception type and message — start here.
- Reading upward shows the **call chain** that led to the error: `calculate()` called `divide(10, 0)`, which failed on `return a / b`.

## `print()` debugging

The simplest, and still extremely common, technique:

```python
def process_order(order):
    print(f"DEBUG: processing order {order}")   # temporary debug output
    total = sum(item["price"] for item in order["items"])
    print(f"DEBUG: total = {total}")
    return total
```

For more informative output with less typing, use an f-string's `=` specifier (Python 3.8+), which prints both the expression and its value:

```python
x = 5
y = 10
print(f"{x=}, {y=}, {x + y=}")
# x=5, y=10, x + y=15
```

::: tip
Remove or replace debug `print()` calls before committing code — or better, use the `logging` module (see [Logging](/testing-and-tools/logging)) from the start, so debug output can be turned on and off without editing the code.
:::

## The interactive debugger: `pdb`

For anything more complex than a simple print statement can reveal, drop into Python's built-in debugger right at the point of interest:

```python
def calculate_total(items):
    breakpoint()   # pauses execution HERE, drops into an interactive debugger
    return sum(item["price"] for item in items)

calculate_total([{"price": 10}, {"price": 20}])
```

Running this drops you into a `(Pdb)` prompt at that exact line:

```
(Pdb) items
[{'price': 10}, {'price': 20}]
(Pdb) items[0]
{'price': 10}
(Pdb) n          # execute the next line
(Pdb) c          # continue running normally
```

Common `pdb` commands:

| Command | Action |
|---|---|
| `n` | next line (step over) |
| `s` | step into a function call |
| `c` | continue running until the next breakpoint |
| `l` | list the surrounding source code |
| `p expression` | print the value of an expression |
| `q` | quit the debugger |

`breakpoint()` is a built-in function (Python 3.7+) that's equivalent to `import pdb; pdb.set_trace()`, but shorter and more discoverable.

## Debugging in an editor (recommended for most work)

Both VS Code and PyCharm offer graphical debuggers — set a breakpoint by clicking next to a line number, run in "debug mode," and inspect variables, step through code, and view the call stack visually. For anything beyond a quick script, this is usually faster and less error-prone than `pdb` alone.

## Common bug categories and where to look

| Symptom | Likely cause |
|---|---|
| `NameError` | Typo in a variable name, or using it before assignment |
| `AttributeError: 'NoneType' object has no attribute ...` | A function returned `None` unexpectedly — trace back where that value came from |
| Wrong values in a loop | Off-by-one errors in `range()`, or [late-binding closures](/functions-deep-dive/closures) |
| Function modifies data it shouldn't | Accidentally mutating a shared [mutable object](/data-structures/lists) instead of working on a copy |
| Silent wrong behavior, no crash | A caught exception (`except: pass`) is hiding the real error — see [try/except](/error-handling/try-except-finally) |

## Assertions — cheap sanity checks

```python
def calculate_average(numbers):
    assert len(numbers) > 0, "Cannot average an empty list"
    return sum(numbers) / len(numbers)
```

`assert` raises an `AssertionError` with your message if the condition is `False`. It's a lightweight way to document and check assumptions during development — but note that assertions can be globally disabled in production (via the `-O` flag), so never use them for validating untrusted input or enforcing real business logic.

**Next up:** [unittest & pytest →](/testing-and-tools/unittest-and-pytest)
