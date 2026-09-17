# Properties

A **property** lets a method be accessed like a plain attribute — no parentheses — while still running code behind the scenes. It's how Python implements validated attributes and computed values without breaking the simple `object.attribute` syntax.

## The problem properties solve

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius

c = Circle(5)
c.radius = -10   # nothing stops this, even though a negative radius is nonsensical
```

You could add a `set_radius()` method that validates the input, but then every caller has to use `c.set_radius(5)` instead of the natural `c.radius = 5` — and if `radius` was already a public attribute used throughout a codebase, you'd have to change every call site.

## Using `@property`

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius   # goes through the setter below

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self):              # a READ-ONLY computed property — no setter defined
        return 3.14159 * self._radius ** 2

c = Circle(5)
print(c.radius)   # 5           — looks like a plain attribute access
print(c.area)      # 78.53975   — computed on the fly, no parentheses needed

c.radius = 10      # goes through the validation in the setter
print(c.area)       # 314.159

c.radius = -5       # ValueError: Radius cannot be negative
```

Three decorators work together here:

- `@property` turns the `radius` method into a **getter** — accessed as `c.radius`, not `c.radius()`.
- `@radius.setter` defines what happens on `c.radius = value`.
- A property with only a getter (like `area`) is automatically **read-only** — attempting `c.area = 100` raises `AttributeError`.

## The underlying pattern: a "backing" attribute

Notice `radius` (the property) and `self._radius` (the actual stored value) are different names. This is essential — if the setter were named `self.radius = value` inside itself, it would call the setter again infinitely, causing a `RecursionError`. The leading-underscore `_radius` is the real storage; `radius` is the public, validated interface to it.

## Read-only properties for derived values

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return self.width * self.height

    @property
    def perimeter(self):
        return 2 * (self.width + self.height)

r = Rectangle(4, 6)
print(r.area)       # 24
print(r.perimeter)  # 20
```

`area` and `perimeter` are always in sync with `width` and `height` — there's no way for them to become stale, because they're computed fresh every time they're accessed, rather than stored separately.

## Adding a deleter

Less common, but properties also support `@x.deleter` for custom behavior on `del obj.x`:

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.deleter
    def radius(self):
        print("Radius deleted!")
        del self._radius

c = Circle(5)
del c.radius   # Radius deleted!
```

## When to reach for `@property`

Start with plain attributes. Convert one into a property **only when you need it** — validation, a computed value, or logging on access/change. Because the calling syntax (`obj.attr`) doesn't change either way, this conversion never breaks existing code that uses the class.

**Next up:** [Polymorphism →](/oop/polymorphism)
