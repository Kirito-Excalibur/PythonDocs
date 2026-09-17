# Functions

A function is a reusable, named block of code. Functions let you avoid repeating yourself and let you break a large problem into small, understandable pieces.

## Defining and calling a function

```python
def greet(name):
    return f"Hello, {name}!"

message = greet("Ada")
print(message)   # Hello, Ada!
```

- `def` starts a function definition.
- `greet` is the function's name.
- `name` is a **parameter** — a placeholder for a value the caller provides.
- `"Ada"` passed in the call is the **argument** — the actual value.
- `return` sends a value back to the caller and immediately ends the function.

A function with no `return` statement returns `None` automatically:

```python
def say_hi():
    print("hi")

result = say_hi()
print(result)  # None
```

## Default parameter values

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Ada"))                # Hello, Ada!
print(greet("Ada", "Hi"))          # Hi, Ada!
print(greet("Ada", greeting="Hey"))  # Hey, Ada!
```

::: warning Careful! Mutable default arguments
Never use a mutable object (like a list or dict) as a default value:
```python
def add_item(item, cart=[]):   # DANGEROUS
    cart.append(item)
    return cart

print(add_item("apple"))   # ['apple']
print(add_item("banana"))  # ['apple', 'banana'] — surprise! same list reused
```
The default value is created **once**, when the function is defined, not each time it's called. The fix is to default to `None` and create the list inside the function:
```python
def add_item(item, cart=None):
    if cart is None:
        cart = []
    cart.append(item)
    return cart
```
:::

## Positional vs keyword arguments

```python
def describe_pet(name, species):
    print(f"{name} is a {species}")

describe_pet("Rex", "dog")                     # positional
describe_pet(name="Rex", species="dog")        # keyword
describe_pet(species="dog", name="Rex")        # keyword — order doesn't matter
```

Keyword arguments make calls with several parameters much more readable, especially when some are booleans or numbers whose meaning isn't obvious from the value alone.

## Variable numbers of arguments: `*args` and `**kwargs`

A brief preview — the full treatment is in [*args and **kwargs](/functions-deep-dive/args-kwargs):

```python
def total(*numbers):
    return sum(numbers)

print(total(1, 2, 3))        # 6
print(total(1, 2, 3, 4, 5))  # 15
```

## Return values

A function can return any type, including multiple values (packed as a tuple):

```python
def min_max(numbers):
    return min(numbers), max(numbers)

lowest, highest = min_max([4, 1, 9, 3])
print(lowest, highest)  # 1 9
```

You can also `return` early to exit a function before reaching its end:

```python
def divide(a, b):
    if b == 0:
        return None
    return a / b

print(divide(10, 2))  # 5.0
print(divide(10, 0))  # None
```

## Docstrings

A string literal placed as the first line of a function body becomes its **docstring** — documentation that tools (and the built-in `help()`) can display:

```python
def circle_area(radius):
    """Return the area of a circle with the given radius."""
    return 3.14159 * radius ** 2

help(circle_area)
```

```
Help on function circle_area in module __main__:

circle_area(radius)
    Return the area of a circle with the given radius.
```

## Type hints (a preview)

Modern Python code often annotates parameter and return types for clarity and tooling support — these are *hints*, not enforced at runtime:

```python
def add(a: int, b: int) -> int:
    return a + b
```

Fully covered in [Type Hints](/advanced/type-hints).

## Why functions matter

```python
# Without a function — repeated logic
price1 = 100
discounted1 = price1 - (price1 * 0.1)

price2 = 250
discounted2 = price2 - (price2 * 0.1)

# With a function — one source of truth
def apply_discount(price, rate=0.1):
    return price - (price * rate)

discounted1 = apply_discount(100)
discounted2 = apply_discount(250)
```

If the discount logic ever needs to change, there's exactly one place to update it.

**Next up:** [Lambda Functions →](/fundamentals/lambda-functions)
