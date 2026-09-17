# Static & Class Methods

Besides regular instance methods (which take `self`), Python classes support two other kinds of methods: **class methods** and **static methods**.

## Instance methods (the default, for comparison)

```python
class Pizza:
    def __init__(self, toppings):
        self.toppings = toppings

    def describe(self):    # instance method — needs a specific instance
        return f"Pizza with {', '.join(self.toppings)}"
```

`self` gives access to the specific instance's data. Most methods you write will be regular instance methods.

## Class methods: `@classmethod`

A class method receives the **class itself** (conventionally named `cls`) instead of an instance. The most common use is an **alternative constructor** — a different way to build an instance than the default `__init__`:

```python
class Pizza:
    def __init__(self, toppings):
        self.toppings = toppings

    @classmethod
    def margherita(cls):
        return cls(["mozzarella", "tomato"])

    @classmethod
    def pepperoni(cls):
        return cls(["mozzarella", "pepperoni"])

    def describe(self):
        return f"Pizza with {', '.join(self.toppings)}"

p1 = Pizza.margherita()
p2 = Pizza.pepperoni()
print(p1.describe())  # Pizza with mozzarella, tomato
print(p2.describe())  # Pizza with mozzarella, pepperoni
```

Using `cls(...)` instead of `Pizza(...)` matters for inheritance — if a subclass calls `margherita()`, `cls` correctly refers to the subclass, not hard-coded to `Pizza`:

```python
class StuffedCrustPizza(Pizza):
    pass

stuffed = StuffedCrustPizza.margherita()
print(type(stuffed))  # <class 'StuffedCrustPizza'> — not Pizza!
```

A real-world example you may already know: `dict.fromkeys()` and `datetime.fromisoformat()` are class methods.

## Static methods: `@staticmethod`

A static method takes **neither** `self` nor `cls`. It behaves like a plain function that just happens to live inside the class's namespace, usually because it's conceptually related:

```python
class TemperatureConverter:
    @staticmethod
    def celsius_to_fahrenheit(celsius):
        return celsius * 9 / 5 + 32

    @staticmethod
    def fahrenheit_to_celsius(fahrenheit):
        return (fahrenheit - 32) * 5 / 9

print(TemperatureConverter.celsius_to_fahrenheit(100))  # 212.0
```

Notice it's called on the class directly — no instance needed at all.

## Choosing between the three

| | Receives | Called via | Typical use |
|---|---|---|---|
| Instance method | `self` | `instance.method()` | Operates on this object's data |
| Class method | `cls` | `Class.method()` or `instance.method()` | Alternative constructors, class-level operations |
| Static method | nothing extra | `Class.method()` or `instance.method()` | A helper function that's grouped with the class for organization |

::: tip Rule of thumb
Default to a regular instance method. Use `@classmethod` when you need an alternative way to construct an instance, or need to know which subclass you're operating on. Use `@staticmethod` when the method doesn't touch `self` or `cls` at all — at that point, ask yourself whether it should just be a standalone module-level function instead.
:::

## All three side by side

```python
class Circle:
    pi = 3.14159

    def __init__(self, radius):
        self.radius = radius

    def area(self):                        # instance method
        return self.pi * self.radius ** 2

    @classmethod
    def from_diameter(cls, diameter):       # class method
        return cls(diameter / 2)

    @staticmethod
    def is_valid_radius(radius):            # static method
        return radius > 0

c1 = Circle(5)
c2 = Circle.from_diameter(10)

print(c1.area())                          # 78.53975
print(c2.radius)                           # 5.0
print(Circle.is_valid_radius(-1))          # False
```

**Next up:** [Abstract Base Classes →](/oop/abstract-classes)
