# Context Managers

A context manager guarantees that setup and cleanup code run together, even if an exception happens in between. You've already used one every time you've opened a file with `with`.

## The problem context managers solve

```python
file = open("data.txt")
contents = file.read()
# do something with contents that raises an exception...
file.close()   # never runs if the line above crashes!
```

If anything between `open()` and `close()` raises an exception, the file is left open — a **resource leak**. You could wrap it in `try`/`finally` (see [try / except / finally](/error-handling/try-except-finally)):

```python
file = open("data.txt")
try:
    contents = file.read()
finally:
    file.close()   # guaranteed to run
```

This works, but it's verbose, and easy to forget. The `with` statement does exactly this automatically.

## The `with` statement

```python
with open("data.txt") as file:
    contents = file.read()
# file is automatically closed here, even if an exception occurred above
```

This is shorter, and impossible to get wrong by forgetting to close the file — cleanup is baked into the syntax itself.

## Using multiple context managers

```python
with open("input.txt") as infile, open("output.txt", "w") as outfile:
    outfile.write(infile.read().upper())
```

Both files are closed automatically when the block ends.

## Writing your own context manager as a class

Any object with `__enter__` and `__exit__` methods can be used with `with` — this is the same protocol mentioned briefly in [Magic Methods](/oop/magic-methods):

```python
class Timer:
    def __enter__(self):
        import time
        self.start = time.perf_counter()
        return self   # what "as x" binds to

    def __exit__(self, exc_type, exc_value, traceback):
        import time
        elapsed = time.perf_counter() - self.start
        print(f"Elapsed: {elapsed:.4f}s")
        return False   # False means: don't suppress any exception that occurred

with Timer():
    total = sum(range(10_000_000))
```

```
Elapsed: 0.1523s
```

`__enter__` runs at the start of the block and its return value is what `as` binds to. `__exit__` always runs at the end of the block — whether it ended normally or via an exception — and receives details about any exception that occurred (all `None` if there wasn't one).

### Suppressing exceptions from `__exit__`

If `__exit__` returns `True`, the exception is considered handled and won't propagate further:

```python
class IgnoreZeroDivision:
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is ZeroDivisionError:
            print("Ignored a division by zero")
            return True   # suppress it
        return False       # let anything else propagate normally

with IgnoreZeroDivision():
    result = 1 / 0
    print("This line never runs")

print("Program continues normally")
```

```
Ignored a division by zero
Program continues normally
```

## A much simpler way: `@contextmanager`

Writing a full class with `__enter__`/`__exit__` is more ceremony than most simple context managers need. `contextlib.contextmanager` lets you write one as a single generator function instead:

```python
from contextlib import contextmanager
import time

@contextmanager
def timer():
    start = time.perf_counter()
    yield                                    # the "with" block runs here
    elapsed = time.perf_counter() - start
    print(f"Elapsed: {elapsed:.4f}s")

with timer():
    total = sum(range(10_000_000))
```

Everything before `yield` is the setup (`__enter__`); everything after is the cleanup (`__exit__`). If the code needs to hand something to `as x`, `yield` a value:

```python
@contextmanager
def open_uppercase(path):
    f = open(path)
    try:
        yield f.read().upper()
    finally:
        f.close()

with open_uppercase("data.txt") as content:
    print(content)
```

Wrapping the `yield` in `try`/`finally` ensures `f.close()` runs even if the code inside the `with` block raises an exception — matching the guarantee a full `__enter__`/`__exit__` class would provide.

## Real-world context managers you'll actually use

```python
import threading

lock = threading.Lock()
with lock:               # acquires the lock, always releases it afterward
    # critical section
    pass

from decimal import localcontext, Decimal
with localcontext() as ctx:
    ctx.prec = 50          # temporarily change decimal precision
    result = Decimal(1) / Decimal(3)
```

This wraps up error handling. Next, we'll look at how to organize larger programs into modules and packages.

**Next up:** Chapter 7 — [Modules →](/modules-packages/modules)
