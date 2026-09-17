# *args and **kwargs

Sometimes you don't know in advance how many arguments a function needs to accept. `*args` and `**kwargs` let a function accept a variable number of positional and keyword arguments.

## `*args` — variable positional arguments

```python
def total(*args):
    print(args)          # args is a regular tuple
    return sum(args)

print(total(1, 2, 3))        # (1, 2, 3)  -> 6
print(total(1, 2, 3, 4, 5))  # (1, 2, 3, 4, 5) -> 15
print(total())                # () -> 0
```

The name `args` is just convention — the `*` is what matters, not the word "args." You could write `*numbers` instead and it'd work identically.

## `**kwargs` — variable keyword arguments

```python
def describe(**kwargs):
    print(kwargs)   # kwargs is a regular dict
    for key, value in kwargs.items():
        print(f"{key}: {value}")

describe(name="Ada", age=36, city="London")
```

```
{'name': 'Ada', 'age': 36, 'city': 'London'}
name: Ada
age: 36
city: London
```

## Combining regular parameters, `*args`, and `**kwargs`

The required order is: regular positional parameters, then `*args`, then keyword-only parameters, then `**kwargs`.

```python
def create_user(username, *args, is_admin=False, **kwargs):
    print("username:", username)
    print("extra positional:", args)
    print("is_admin:", is_admin)
    print("extra keyword:", kwargs)

create_user("ada", "extra1", "extra2", is_admin=True, email="ada@example.com")
```

```
username: ada
extra positional: ('extra1', 'extra2')
is_admin: True
extra keyword: {'email': 'ada@example.com'}
```

## Spreading arguments when *calling* a function

This is the mirror image — using `*` and `**` to unpack a collection *into* separate arguments when calling. Full details in [Unpacking](/data-structures/unpacking):

```python
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
print(add(*numbers))          # 6

data = {"a": 1, "b": 2, "c": 3}
print(add(**data))             # 6
```

## A realistic use case: wrapping another function

`*args`/`**kwargs` are essential for writing generic wrappers that pass arguments through without knowing what they are — this comes up constantly with decorators (see [Decorators](/functions-deep-dive/decorators)):

```python
def log_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with {args}, {kwargs}")
        return func(*args, **kwargs)
    return wrapper

@log_call
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Ada", greeting="Hi"))
```

```
Calling greet with ('Ada',), {'greeting': 'Hi'}
Hi, Ada!
```

`wrapper` doesn't need to know anything about `greet`'s actual parameters — it just forwards everything it receives.

## Keyword-only and positional-only parameters

Python lets you force certain parameters to be passed *only* by keyword, or *only* positionally:

```python
def connect(host, port, *, timeout=30):
    # timeout MUST be passed as a keyword argument
    print(host, port, timeout)

connect("localhost", 8080, timeout=5)   # OK
connect("localhost", 8080, 5)           # TypeError — too many positional arguments
```

```python
def divide(a, b, /):
    # a and b MUST be passed positionally
    return a / b

print(divide(10, 2))          # OK
print(divide(a=10, b=2))      # TypeError — positional-only arguments passed as keyword
```

The `*` marks the boundary before which arguments may be positional; the `/` marks the boundary after which arguments may be keyword. This is mostly useful for library authors who want a stable, explicit calling convention.

**Next up:** [Closures →](/functions-deep-dive/closures)
