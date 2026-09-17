# Metaclasses

If a class is a blueprint for creating objects, a **metaclass** is a blueprint for creating classes. This is one of the most abstract corners of Python — you're unlikely to need to write one, but understanding the idea demystifies a lot of "magic" in frameworks like Django and SQLAlchemy.

## Everything is an object — including classes

```python
class Dog:
    pass

rex = Dog()
print(type(rex))   # <class '__main__.Dog'>   -- rex's type is Dog
print(type(Dog))    # <class 'type'>            -- Dog's type is `type`!
```

Just as `rex` is an *instance* of `Dog`, `Dog` itself is an *instance* of `type`. `type` is the default metaclass — every class you've ever written was actually created by `type` behind the scenes.

## `type` can create classes directly

```python
# Equivalent to: class Dog: pass
Dog = type("Dog", (), {})

# Equivalent to:
# class Dog:
#     species = "Canis familiaris"
#     def bark(self):
#         return "Woof!"
Dog = type("Dog", (), {
    "species": "Canis familiaris",
    "bark": lambda self: "Woof!",
})

rex = Dog()
print(rex.species)   # Canis familiaris
print(rex.bark())     # Woof!
```

`type(name, bases, namespace)` takes the class name, a tuple of parent classes, and a dict of attributes/methods — exactly what a `class` statement produces under the hood.

## Writing a custom metaclass

A custom metaclass subclasses `type` and can override `__new__` or `__init__` to customize class *creation* itself:

```python
class UpperAttrMeta(type):
    def __new__(mcs, name, bases, namespace):
        uppercase_namespace = {
            (key.upper() if not key.startswith("__") else key): value
            for key, value in namespace.items()
        }
        return super().__new__(mcs, name, bases, uppercase_namespace)

class Config(metaclass=UpperAttrMeta):
    debug = True
    timeout = 30

print(Config.DEBUG)     # True
print(Config.TIMEOUT)    # 30
# print(Config.debug)   # AttributeError — renamed at class-creation time!
```

Every class using `metaclass=UpperAttrMeta` gets this attribute-renaming behavior applied automatically, at the moment the class itself is defined — before any instance ever exists.

## What metaclasses are actually used for in practice

You'll rarely write one yourself, but they power some well-known patterns:

- **Registering subclasses automatically** — a framework can maintain a registry of every class that inherits from a certain base, without any manual registration step.
- **Enforcing rules across an API** — e.g., Django's ORM uses a metaclass so that writing `name = CharField()` inside a `Model` subclass automatically wires it up to database schema generation, validation, and querying.
- **Singleton enforcement** — ensuring only one instance of a class can ever be created, enforced at the class-creation level rather than per-instance.

## A simpler alternative: `__init_subclass__`

For many "do something whenever a subclass is defined" use cases, the newer `__init_subclass__` hook avoids metaclasses entirely:

```python
class Plugin:
    registry = []

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        Plugin.registry.append(cls)

class CSVPlugin(Plugin):
    pass

class JSONPlugin(Plugin):
    pass

print(Plugin.registry)   # [<class 'CSVPlugin'>, <class 'JSONPlugin'>]
```

This achieves the "auto-registration" use case above without the added complexity of a full metaclass.

::: tip The famous quote
Tim Peters, a longtime core Python contributor, put it well: *"Metaclasses are deeper magic than 99% of users should ever worry about. If you wonder whether you need them, you don't."* Reach for `__init_subclass__`, class decorators, or plain inheritance first — metaclasses are a last resort for framework-level code.
:::

This wraps up the advanced topics chapter. Finally, we'll cover the tools that help you find and prevent bugs: debugging, testing, and logging.

**Next up:** Chapter 12 — [Debugging →](/testing-and-tools/debugging)
