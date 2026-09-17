# Descriptors

A **descriptor** is an object that customizes what happens when an attribute is accessed, set, or deleted on another class. They're an advanced, lower-level mechanism — in fact, `@property` (from [Properties](/oop/properties)) is itself implemented using the descriptor protocol under the hood.

## The descriptor protocol

An object becomes a descriptor by implementing any of these methods:

```python
class Descriptor:
    def __get__(self, instance, owner):
        ...
    def __set__(self, instance, value):
        ...
    def __delete__(self, instance):
        ...
```

- `__get__` runs when the attribute is **read**.
- `__set__` runs when the attribute is **assigned**.
- `__delete__` runs when the attribute is deleted with `del`.

A descriptor with `__set__` or `__delete__` is a **data descriptor**; one with only `__get__` is a **non-data descriptor**.

## A minimal example

```python
class PositiveNumber:
    def __set_name__(self, owner, name):
        self.name = "_" + name

    def __get__(self, instance, owner):
        if instance is None:
            return self
        return getattr(instance, self.name)

    def __set__(self, instance, value):
        if value <= 0:
            raise ValueError(f"{self.name[1:]} must be positive")
        setattr(instance, self.name, value)

class Circle:
    radius = PositiveNumber()   # the descriptor is a CLASS attribute

    def __init__(self, radius):
        self.radius = radius     # this line triggers PositiveNumber.__set__

c = Circle(5)
print(c.radius)    # 5  — triggers PositiveNumber.__get__

c.radius = -3       # ValueError: radius must be positive
```

`__set_name__` is a helper that Python calls automatically when the class is created, telling the descriptor what attribute name it was assigned to (`radius`, in this case) — this lets one descriptor class validate multiple different attributes.

## Why this looks a lot like `@property`

It should — `@property` is a built-in, ready-made data descriptor. Compare:

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value <= 0:
            raise ValueError("radius must be positive")
        self._radius = value
```

`@property` covers the overwhelming majority of real use cases with far less code. A custom descriptor is worth writing only when you need to **reuse the same validation logic across many attributes or many classes** — like `PositiveNumber` above, which could validate `radius`, `weight`, `price`, or anything else that must stay positive, all with a single class.

## Where descriptors show up in Python itself

You've been using descriptors without necessarily knowing it:

- **Methods themselves are descriptors.** This is literally how `self` gets bound automatically — a function accessed through an instance becomes a "bound method" via `__get__`.
- `@staticmethod` and `@classmethod` (from [Static & Class Methods](/oop/class-static-methods)) are also implemented as descriptors.
- Django's ORM and other frameworks use custom descriptors extensively — a model field like `name = CharField(max_length=50)` uses the descriptor protocol to validate and store data.

## Instance dict lookup order

When you access `obj.attribute`, Python checks (roughly, in order):

1. Data descriptors defined on the class (or a parent class).
2. The instance's own `__dict__`.
3. Non-data descriptors and other class attributes.

This is why a `@property` (a data descriptor) always takes priority even if you try to set the "same name" directly into `instance.__dict__` — the descriptor's `__get__`/`__set__` wins.

::: tip
You'll rarely need to write a custom descriptor in application code — reach for `@property` first, and only consider a raw descriptor when you find yourself copy-pasting the same property logic across several unrelated classes.
:::

**Next up:** [Metaclasses →](/advanced/metaclasses)
