# functools

`functools` provides tools for working with functions themselves — caching their results, transforming their signatures, and combining them.

## `lru_cache` — automatic memoization

Caches a function's return values, keyed by its arguments — calling it again with the same arguments returns the cached result instantly instead of recomputing:

```python
from functools import lru_cache
import time

@lru_cache(maxsize=None)
def slow_square(n):
    time.sleep(1)   # simulate expensive work
    return n * n

print(slow_square(4))   # takes ~1 second
print(slow_square(4))   # instant — returned from cache
print(slow_square(5))   # takes ~1 second (different argument, not cached yet)
```

This is exactly the technique used to make naive recursive algorithms fast, as shown for Fibonacci in [Recursion](/functions-deep-dive/recursion):

```python
@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(100))   # instant, despite exponential-looking recursion
```

`maxsize=None` means an unbounded cache; passing a number (e.g. `maxsize=128`) limits how many results are kept, discarding the least-recently-used ones once full.

::: warning Careful!
Only cache **pure** functions — ones whose output depends purely on their input, with no side effects and no dependence on outside state that can change. Caching a function that reads live data (like current time or a changing file) will return stale results.
:::

## `wraps` — preserving function identity through decorators

Already introduced in [Decorators](/functions-deep-dive/decorators) — essential whenever you write your own decorator:

```python
from functools import wraps

def log_call(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper
```

## `reduce` — collapse a sequence into a single value

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

total = reduce(lambda acc, n: acc + n, numbers)
print(total)   # 15

product = reduce(lambda acc, n: acc * n, numbers, 1)   # 1 is the starting value
print(product)   # 120
```

`reduce` applies the function cumulatively: first to `(1, 2)`, then to `(result, 3)`, then to `(result, 4)`, and so on.

::: tip
For simple sums and products, prefer the built-in `sum()` or `math.prod()` — they're clearer and faster. Reach for `reduce` when the combining logic is genuinely custom and doesn't match an existing built-in.
:::

## `partial` — pre-filling some arguments

Creates a new function with some arguments already "locked in":

```python
from functools import partial

def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))   # 25
print(cube(5))      # 125
```

This is useful when passing a function somewhere that expects a specific signature (like a callback), but your actual function needs extra fixed arguments:

```python
numbers = [1, 2, 3, 4]
squares = list(map(square, numbers))
print(squares)   # [1, 4, 9, 16]
```

## `total_ordering` — fill in comparison methods automatically

If you define `__eq__` and just one ordering method (like `__lt__`), this decorator fills in the rest (`__le__`, `__gt__`, `__ge__`) for you:

```python
from functools import total_ordering

@total_ordering
class Money:
    def __init__(self, amount):
        self.amount = amount

    def __eq__(self, other):
        return self.amount == other.amount

    def __lt__(self, other):
        return self.amount < other.amount

a = Money(10)
b = Money(20)
print(a < b)    # True
print(a > b)    # True — derived automatically from __lt__ and __eq__
print(a <= b)   # True
```

**Next up:** [Regular Expressions (re) →](/standard-library/regular-expressions)
