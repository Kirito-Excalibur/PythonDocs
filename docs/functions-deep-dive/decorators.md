# Decorators

A decorator is a function that takes another function and extends its behavior, without permanently modifying its actual source code. Decorators are built directly on top of [closures](/functions-deep-dive/closures) and the fact that functions are values in Python, just like numbers or strings.

## Functions are values

Before decorators make sense, internalize this: in Python, a function is an object you can pass around like anything else.

```python
def greet():
    return "Hello!"

say_hello = greet     # no parentheses — we're referencing the function itself
print(say_hello())     # Hello!
print(greet is say_hello)  # True — same function object
```

## Building a decorator from scratch

A decorator is just a function that accepts a function and returns a new function:

```python
def shout(func):
    def wrapper():
        result = func()
        return result.upper()
    return wrapper

def greet():
    return "hello"

greet = shout(greet)   # manually "decorate" greet
print(greet())          # HELLO
```

## The `@` syntax

`@shout` above `def greet():` is exactly equivalent to `greet = shout(greet)` — just cleaner to read:

```python
def shout(func):
    def wrapper():
        return func().upper()
    return wrapper

@shout
def greet():
    return "hello"

print(greet())  # HELLO
```

## Handling arguments with `*args` and `**kwargs`

A real decorator needs to work with functions that take any arguments. This is exactly what `*args`/`**kwargs` are for (see [*args and **kwargs](/functions-deep-dive/args-kwargs)):

```python
def log_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}{args}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result!r}")
        return result
    return wrapper

@log_call
def add(a, b):
    return a + b

print(add(2, 3))
```

```
Calling add(2, 3)
add returned 5
5
```

## Preserving function metadata with `functools.wraps`

Without help, a decorated function loses its original name and docstring — `wrapper` shadows them:

```python
@log_call
def add(a, b):
    """Add two numbers."""
    return a + b

print(add.__name__)  # wrapper — not "add"!
print(add.__doc__)   # None
```

Fix this with `functools.wraps`, applied to the inner function:

```python
from functools import wraps

def log_call(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result
    return wrapper

@log_call
def add(a, b):
    """Add two numbers."""
    return a + b

print(add.__name__)  # add
print(add.__doc__)   # Add two numbers.
```

::: tip
Always use `@functools.wraps(func)` when writing a real decorator. It costs nothing and avoids confusing debugging/introspection tools later.
:::

## Decorators that accept arguments

To parameterize a decorator itself (like `@repeat(3)`), you need an extra layer of nesting — a function that returns a decorator:

```python
from functools import wraps

def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            result = None
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

greet("Ada")
```

```
Hello, Ada!
Hello, Ada!
Hello, Ada!
```

## Common built-in decorators

You've likely already seen these without the name "decorator" attached:

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        return 3.14159 * self.radius ** 2

    @staticmethod
    def unit_circle():
        return Circle(1)

    @classmethod
    def from_diameter(cls, diameter):
        return cls(diameter / 2)
```

`@property`, `@staticmethod`, and `@classmethod` are covered in depth in [Properties](/oop/properties) and [Static & Class Methods](/oop/class-static-methods).

## Stacking multiple decorators

```python
@log_call
@repeat(2)
def greet(name):
    print(f"Hi, {name}")

greet("Ada")
```

Decorators apply bottom-up: `repeat(2)` wraps `greet` first, then `log_call` wraps the result. Reading `@`-stacks from the bottom up tells you the actual order of wrapping.

**Next up:** [Iterators →](/functions-deep-dive/iterators)
