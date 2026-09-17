# Closures

A **closure** is a function that remembers the variables from the scope it was created in, even after that outer scope has finished executing. We touched on this briefly in [Scope](/fundamentals/scope) — here's the full picture.

## A basic closure

```python
def make_multiplier(factor):
    def multiplier(number):
        return number * factor   # "factor" comes from the enclosing scope
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15
```

`make_multiplier` runs, returns `multiplier`, and then finishes — but `multiplier` still has access to `factor`. Each call to `make_multiplier` creates a *fresh* `factor`, so `double` and `triple` don't interfere with each other. This is the closure: the inner function "closes over" the variable from its enclosing scope.

## Why this works

Every function remembers a reference to its enclosing scope, not just a snapshot of the values at creation time. You can inspect this:

```python
print(double.__closure__[0].cell_contents)  # 2
```

## Closures with mutable state

Using `nonlocal` (introduced in [Scope](/fundamentals/scope)), a closure can maintain state across multiple calls:

```python
def make_counter():
    count = 0

    def increment():
        nonlocal count
        count += 1
        return count

    return increment

counter_a = make_counter()
counter_b = make_counter()

print(counter_a())  # 1
print(counter_a())  # 2
print(counter_b())  # 1 — an entirely separate counter
```

Each call to `make_counter()` creates its own independent `count` variable, captured by its own `increment` function.

## The classic late-binding pitfall

::: warning Careful! Closures capture variables, not values
```python
functions = []
for i in range(3):
    functions.append(lambda: i)

print([f() for f in functions])   # [2, 2, 2] — NOT [0, 1, 2]!
```
Each lambda captures the *variable* `i`, not its value at the time the lambda was created. By the time the lambdas are called, the loop has finished and `i` is `2` for all of them.

Fix it by capturing the current value as a default argument, which *is* evaluated immediately:
```python
functions = []
for i in range(3):
    functions.append(lambda i=i: i)

print([f() for f in functions])   # [0, 1, 2] — correct
```
:::

## Practical uses for closures

**Configurable helper functions:**

```python
def make_validator(min_length):
    def validate(text):
        return len(text) >= min_length
    return validate

is_valid_password = make_validator(8)
print(is_valid_password("short"))     # False
print(is_valid_password("longenough")) # True
```

**Decorators** (covered next) are built entirely on closures:

```python
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def say_hi():
    print("hi")

say_hi()
```

```
hi
hi
hi
```

**Next up:** [Decorators →](/functions-deep-dive/decorators)
