# Classes and Objects

Object-oriented programming (OOP) bundles data and the functions that operate on that data together into a single unit: an **object**. A **class** is the blueprint from which objects are created.

## Defining a class

```python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} says Woof!"
```

- `class Dog:` defines a new type named `Dog`.
- `__init__` is the **constructor** — it runs automatically when a new `Dog` is created, and sets up the object's initial state.
- `self` refers to the specific object being created or operated on. It's always the first parameter of a regular method, and Python passes it automatically — you never supply it yourself when calling the method.
- `self.name = name` creates an **attribute** (a piece of data attached to this specific object).

## Creating objects (instances)

```python
rex = Dog("Rex", "Labrador")
fido = Dog("Fido", "Poodle")

print(rex.name)     # Rex
print(fido.breed)   # Poodle
print(rex.bark())    # Rex says Woof!
print(fido.bark())   # Fido says Woof!
```

`rex` and `fido` are both **instances** of the `Dog` class — independent objects, each with their own `name` and `breed`.

## Why `self` matters

```python
rex.bark()
```

is really shorthand for:

```python
Dog.bark(rex)
```

`self` is just the instance the method was called on. Without it, `bark` would have no way to know whether to say "Rex says Woof!" or "Fido says Woof!"

::: warning Careful! Forgetting `self`
```python
class Dog:
    def __init__(self, name):
        self.name = name

    def bark():   # forgot self!
        return "Woof!"

rex = Dog("Rex")
rex.bark()   # TypeError: bark() takes 0 positional arguments but 1 was given
```
Python still passes `rex` automatically as the first argument — the method just didn't declare a parameter to catch it.
:::

## Instance attributes vs. class attributes

An **instance attribute** belongs to one specific object (usually set in `__init__`). A **class attribute** is shared by every instance of the class:

```python
class Dog:
    species = "Canis familiaris"   # class attribute — shared by all dogs

    def __init__(self, name):
        self.name = name           # instance attribute — unique per dog

rex = Dog("Rex")
fido = Dog("Fido")

print(rex.species, fido.species)  # Canis familiaris Canis familiaris
print(rex.name, fido.name)        # Rex Fido

Dog.species = "Updated species"
print(rex.species)   # Updated species — changing the class attribute affects all instances
```

::: warning Careful! Mutable class attributes are shared
```python
class ShoppingCart:
    items = []   # DANGEROUS — one list shared by every instance

    def add(self, item):
        self.items.append(item)

cart1 = ShoppingCart()
cart2 = ShoppingCart()
cart1.add("apple")
print(cart2.items)  # ['apple'] — leaked into cart2!
```
Set mutable attributes in `__init__` instead, so each instance gets its own:
```python
class ShoppingCart:
    def __init__(self):
        self.items = []
```
:::

## Methods that use other methods

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

    def describe(self):
        return f"{self.width}x{self.height} rectangle, area={self.area()}"

r = Rectangle(4, 5)
print(r.describe())  # 4x5 rectangle, area=20
```

## The `__str__` method: readable printing

By default, printing an object gives an unhelpful representation. Define `__str__` to control it:

```python
class Dog:
    def __init__(self, name):
        self.name = name

rex = Dog("Rex")
print(rex)   # <__main__.Dog object at 0x7f...>

class Dog:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"Dog named {self.name}"

rex = Dog("Rex")
print(rex)   # Dog named Rex
```

This is one of many "magic methods" — see [Magic Methods](/oop/magic-methods) for the full set.

**Next up:** [Inheritance →](/oop/inheritance)
