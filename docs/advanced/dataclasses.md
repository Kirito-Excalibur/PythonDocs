# Dataclasses

A **dataclass** is a class designed mainly to hold data, where Python automatically generates the boilerplate — `__init__`, `__repr__`, `__eq__` — for you.

## The boilerplate problem

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

p1 = Point(1, 2)
p2 = Point(1, 2)
print(p1)          # Point(x=1, y=2)
print(p1 == p2)     # True
```

This is a lot of repetitive code (see [Magic Methods](/oop/magic-methods)) for what's fundamentally just "a container for `x` and `y`."

## The same class with `@dataclass`

```python
from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

p1 = Point(1, 2)
p2 = Point(1, 2)

print(p1)          # Point(x=1, y=2)   -- __repr__ generated automatically
print(p1 == p2)     # True             -- __eq__ generated automatically
```

The `@dataclass` decorator reads the [type-hinted](/advanced/type-hints) class attributes and generates `__init__`, `__repr__`, and `__eq__` based on them — no manual boilerplate needed.

::: tip
The type hints (`x: int`, `y: int`) are required for `@dataclass` to know what fields exist — but exactly like regular type hints, they're still not enforced at runtime. `Point("not a number", 2)` runs without error.
:::

## Default values

```python
from dataclasses import dataclass

@dataclass
class Config:
    debug: bool = False
    max_connections: int = 100
    name: str = "default"

c = Config()
print(c)   # Config(debug=False, max_connections=100, name='default')

c2 = Config(debug=True, max_connections=50)
print(c2)   # Config(debug=True, max_connections=50, name='default')
```

## Mutable default values — handled safely

Recall from [Functions](/fundamentals/functions) that a mutable default argument is a classic bug. `@dataclass` gives you a safe way to do this using `field(default_factory=...)`:

```python
from dataclasses import dataclass, field

@dataclass
class ShoppingCart:
    items: list = field(default_factory=list)   # a NEW list per instance

cart1 = ShoppingCart()
cart2 = ShoppingCart()
cart1.items.append("apple")

print(cart1.items)   # ['apple']
print(cart2.items)   # [] — correctly independent, unlike the plain-function bug
```

## Adding your own methods

A dataclass is still a regular class — you can add any methods you like alongside the generated ones:

```python
from dataclasses import dataclass

@dataclass
class Rectangle:
    width: float
    height: float

    def area(self) -> float:
        return self.width * self.height

r = Rectangle(4, 5)
print(r.area())  # 20
```

## Immutable dataclasses with `frozen=True`

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Point:
    x: int
    y: int

p = Point(1, 2)
p.x = 100   # dataclasses.FrozenInstanceError: cannot assign to field 'x'
```

A frozen dataclass behaves like a [tuple](/data-structures/tuples): immutable, and hashable (so it can be used as a dict key or set member), which a regular mutable dataclass cannot be by default.

## Ordering dataclasses

```python
from dataclasses import dataclass

@dataclass(order=True)
class Version:
    major: int
    minor: int

v1 = Version(1, 5)
v2 = Version(2, 0)
print(v1 < v2)   # True — compares fields in declaration order, like a tuple
```

## Dataclasses vs. plain classes vs. `namedtuple`

| | Mutable | Custom methods | Type hints required | Best for |
|---|---|---|---|---|
| `@dataclass` | Yes (unless `frozen=True`) | Yes | Yes | Most structured data with behavior |
| `namedtuple` | No | Limited | No | Simple, lightweight immutable records |
| Plain class | Yes | Yes | No | Full manual control, complex behavior |

**Next up:** [Descriptors →](/advanced/descriptors)
