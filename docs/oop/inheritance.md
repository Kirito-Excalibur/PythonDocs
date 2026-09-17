# Inheritance

Inheritance lets a class reuse and extend the behavior of another class, instead of duplicating it.

## Basic inheritance

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} makes a sound"

class Dog(Animal):       # Dog inherits from Animal
    def speak(self):
        return f"{self.name} barks"

class Cat(Animal):
    def speak(self):
        return f"{self.name} meows"

generic = Animal("Some creature")
rex = Dog("Rex")
whiskers = Cat("Whiskers")

print(generic.speak())   # Some creature makes a sound
print(rex.speak())        # Rex barks
print(whiskers.speak())   # Whiskers meows
```

`Animal` is the **parent class** (or superclass, or base class). `Dog` and `Cat` are **child classes** (or subclasses) — each **overrides** `speak()` with its own version, while inheriting `__init__` from `Animal` without needing to redefine it.

## Calling the parent's methods with `super()`

Use `super()` to call the parent class's version of a method — most commonly to extend `__init__` rather than replace it entirely:

```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)   # let Animal set up self.name
        self.breed = breed        # then add Dog-specific setup

    def describe(self):
        return f"{self.name} is a {self.breed}"

rex = Dog("Rex", "Labrador")
print(rex.describe())  # Rex is a Labrador
```

Without `super().__init__(name)`, you'd have to duplicate `self.name = name` inside `Dog`, and any future change to `Animal.__init__` wouldn't automatically apply to `Dog`.

## Checking types with `isinstance()` and `issubclass()`

```python
print(isinstance(rex, Dog))      # True
print(isinstance(rex, Animal))   # True — Dog IS an Animal
print(isinstance(rex, Cat))      # False

print(issubclass(Dog, Animal))   # True
print(issubclass(Animal, Dog))   # False
```

::: tip
Prefer `isinstance()` over `type(x) == SomeClass`. `isinstance()` correctly accounts for inheritance — a `Dog` is also an `Animal` — whereas a direct `type()` comparison would miss that relationship.
:::

## Method Resolution Order (MRO)

When a method is called, Python looks for it starting at the instance's own class, then walks up the chain of parent classes:

```python
print(Dog.__mro__)
# (<class 'Dog'>, <class 'Animal'>, <class 'object'>)
```

Every class in Python ultimately inherits from `object`, even if you don't write it explicitly.

## Multiple inheritance

Python allows a class to inherit from more than one parent:

```python
class Swimmer:
    def swim(self):
        return "swimming"

class Flyer:
    def fly(self):
        return "flying"

class Duck(Swimmer, Flyer):
    pass

donald = Duck()
print(donald.swim())  # swimming
print(donald.fly())    # flying
```

When multiple parents define the same method name, Python resolves the conflict using the MRO — parents are checked in the order they're listed, left to right (using a specific algorithm called C3 linearization, which is more nuanced than a simple left-to-right scan when the hierarchy is deep).

::: tip Prefer composition when inheritance gets complicated
Multiple inheritance can get confusing fast, especially with the "diamond problem" (two parents that share a common ancestor). If you find yourself fighting the MRO, it's often simpler to have a class **contain** another object rather than inherit from it — this is called "composition over inheritance," and it's a widely respected guideline, not just in Python.
:::

## Extending vs. overriding entirely

You can call `super()` for part of a method's logic and add your own on top, rather than fully replacing it:

```python
class Vehicle:
    def start(self):
        print("Engine starting...")

class ElectricCar(Vehicle):
    def start(self):
        super().start()
        print("Silent electric hum begins")

ElectricCar().start()
```

```
Engine starting...
Silent electric hum begins
```

**Next up:** [Encapsulation →](/oop/encapsulation)
