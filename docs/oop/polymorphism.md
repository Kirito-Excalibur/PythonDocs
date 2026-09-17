# Polymorphism

Polymorphism ("many forms") means objects of different classes can be used through the same interface — the same method call produces different, type-appropriate behavior depending on the actual object it's called on.

## Polymorphism through inheritance

You've already seen this in [Inheritance](/oop/inheritance):

```python
class Shape:
    def area(self):
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

shapes = [Circle(3), Square(4), Circle(1)]

for shape in shapes:
    print(f"{type(shape).__name__}: {shape.area():.2f}")
```

```
Circle: 28.27
Square: 16.00
Circle: 3.14
```

The calling code — the `for` loop — doesn't know or care which specific shape it's dealing with. It just calls `.area()` and trusts each object to know how to compute its own area correctly. This is the core payoff of polymorphism: code that works with a general interface (`Shape`) automatically works with every specific implementation (`Circle`, `Square`, and any future shape you add).

## Duck typing: Python's flexible take on polymorphism

Python doesn't actually require a shared base class for polymorphism to work — it cares whether an object *supports the operation being used*, not what class it officially belongs to. This is called **duck typing**: "if it walks like a duck and quacks like a duck, it's a duck."

```python
class Duck:
    def speak(self):
        return "Quack!"

class Dog:
    def speak(self):
        return "Woof!"

class Robot:
    def speak(self):
        return "BEEP BOOP"

# None of these share a common parent class — doesn't matter
for thing in [Duck(), Dog(), Robot()]:
    print(thing.speak())
```

```
Quack!
Woof!
BEEP BOOP
```

As long as each object has a `.speak()` method, the loop works — there's no requirement that they be related by inheritance at all.

## Operator overloading is also polymorphism

The `+` operator behaves completely differently depending on the type it's applied to:

```python
print(1 + 2)          # 3          — numeric addition
print("a" + "b")      # ab         — string concatenation
print([1] + [2])      # [1, 2]     — list concatenation
```

This works because each type defines its own `__add__` method. You can give your own classes this same flexibility — covered fully in [Magic Methods](/oop/magic-methods):

```python
class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

print(Vector(1, 2) + Vector(3, 4))  # Vector(4, 6)
```

## Abstract base classes: enforcing the interface

Duck typing is flexible but offers no safety net — if `Square` forgets to implement `.area()`, you won't find out until it's actually called. To make an interface a hard requirement rather than a convention, use an **abstract base class**, covered fully in [Abstract Base Classes](/oop/abstract-classes):

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Triangle(Shape):
    pass   # forgot to implement area()

t = Triangle()  # TypeError: Can't instantiate abstract class Triangle with abstract method area
```

**Next up:** [Magic Methods →](/oop/magic-methods)
