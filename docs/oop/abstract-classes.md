# Abstract Base Classes

An **abstract base class** (ABC) defines an interface that subclasses are *required* to implement, enforced by Python at instantiation time — rather than relying on convention or duck typing, as discussed in [Polymorphism](/oop/polymorphism).

## The problem without ABCs

```python
class Shape:
    def area(self):
        raise NotImplementedError("Subclasses must implement area()")

class Square(Shape):
    def __init__(self, side):
        self.side = side
    # forgot to implement area()!

s = Square(4)
s.area()   # NotImplementedError — but only discovered when actually CALLED
```

The mistake is only caught when `area()` is finally invoked, which might be much later, in a completely different part of the program.

## Using `abc.ABC` and `@abstractmethod`

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Square(Shape):
    def __init__(self, side):
        self.side = side
    # still forgot to implement area() and perimeter()

s = Square(4)
```

```
TypeError: Can't instantiate abstract class Square with abstract methods area, perimeter
```

Now the mistake is caught **immediately**, at the moment you try to create a `Square` — long before any bug could hide in production code.

## Implementing the full interface

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

    def perimeter(self):
        return self.side * 4

s = Square(4)
print(s.area())        # 16
print(s.perimeter())    # 16
```

## You cannot instantiate the abstract class itself

```python
shape = Shape()
```

```
TypeError: Can't instantiate abstract class Shape with abstract methods area, perimeter
```

`Shape` exists purely as a contract — it defines what a shape *must* be able to do, not a usable object on its own.

## ABCs can still provide concrete (shared) methods

An abstract class isn't limited to only abstract methods — it can mix in regular methods that all subclasses inherit for free:

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    def describe(self):   # a normal, concrete method — not abstract
        return f"This {type(self).__name__} has an area of {self.area():.2f}"

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

print(Circle(3).describe())  # This Circle has an area of 28.27
```

## ABCs vs. duck typing: when to use which

Python's culture generally favors duck typing (see [Polymorphism](/oop/polymorphism)) for flexibility, but ABCs earn their place when:

- You're building a **library or framework** that other developers will extend, and want to fail loudly with a clear error if they miss a required method.
- The interface has **multiple required methods**, and it's easy to accidentally implement only some of them.
- You want the requirement documented directly in code, rather than only in a docstring or external documentation.

::: tip
The standard library itself uses this pattern extensively — `collections.abc` defines abstract interfaces like `Iterable`, `Sized`, and `Mapping` that formalize exactly what "an iterable" or "a mapping" is required to support.
:::

This wraps up object-oriented programming. Next, we'll cover how Python handles things going wrong: exceptions and error handling.

**Next up:** Chapter 6 — [Exceptions →](/error-handling/exceptions)
