# Encapsulation

Encapsulation means bundling data with the methods that operate on it, and controlling how that data can be accessed or modified from outside the class. Python's approach is more about **convention** than strict enforcement — a philosophy often summarized as "we're all consenting adults here."

## Public attributes (the default)

```python
class Person:
    def __init__(self, name):
        self.name = name

p = Person("Ada")
print(p.name)   # Ada — freely accessible
p.name = "Grace"  # freely modifiable, nothing stops this
```

## "Protected" attributes: a single leading underscore

By convention, a name starting with a single underscore signals "this is internal — please don't touch it from outside the class," but Python does **not** enforce this. It's purely a hint to other developers:

```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance   # "protected" by convention only

    def deposit(self, amount):
        self._balance += amount

account = BankAccount(100)
account.deposit(50)
print(account._balance)   # 150 — still technically accessible, but you shouldn't
```

## "Private" attributes: a double leading underscore

A name starting with **two** underscores (and not ending with two) triggers **name mangling**: Python internally renames it to `_ClassName__attribute`, which makes accidental access from outside — or from a subclass — much harder, though still not truly impossible:

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance

    def get_balance(self):
        return self.__balance

account = BankAccount(100)
print(account.get_balance())   # 100
print(account.__balance)        # AttributeError: no attribute '__balance'
print(account._BankAccount__balance)  # 100 — the mangled name still works
```

Name mangling exists mainly to avoid accidental name collisions in inheritance hierarchies, not to provide true security.

::: tip Which underscore convention should you use?
- **No underscore** — a normal public attribute, part of the class's intended interface.
- **Single underscore (`_name`)** — "internal use, don't rely on this from outside." The most common and idiomatic choice for anything you want to discourage external access to.
- **Double underscore (`__name`)** — reserved for avoiding name clashes in complex inheritance chains. Overused by beginners; use `_name` unless you specifically need mangling.
:::

## Getters and setters — the Python way

Coming from languages like Java, you might expect explicit `get_x()`/`set_x()` methods everywhere. Idiomatic Python instead starts with plain public attributes, and only introduces controlled access later using `@property` if validation or computed values are actually needed:

```python
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius   # starts as a plain attribute
```

If you later need to validate the value on assignment, you can convert `celsius` into a property **without changing how callers use it** — see [Properties](/oop/properties) for the full pattern:

```python
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius   # goes through the setter below

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero is not possible")
        self._celsius = value

t = Temperature(25)
t.celsius = -300   # ValueError: Temperature below absolute zero is not possible
```

Callers still write `t.celsius = 25`, exactly like a plain attribute — they never need to know a property is involved.

## Why encapsulation matters

Encapsulation protects an object's **invariants** — rules that should always hold true. Hiding the raw data and exposing only validated ways to change it means the object can never end up in an inconsistent, broken state:

```python
class BankAccount:
    def __init__(self, balance=0):
        self._balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self._balance += amount

    def withdraw(self, amount):
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount

    @property
    def balance(self):
        return self._balance
```

Without this protection, code anywhere in the program could do `account._balance = -1000` directly, bypassing all the rules the class is meant to enforce.

**Next up:** [Properties →](/oop/properties)
