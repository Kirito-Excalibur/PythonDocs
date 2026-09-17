# Variables

A variable is a name that refers to a value stored in memory. Think of it as a labeled box you can put things into, look inside, or replace the contents of.

## Creating a variable

Python doesn't require you to declare a type — just assign a value with `=`:

```python
message = "Hello, Python!"
age = 30
price = 19.99
```

Here, `message`, `age`, and `price` are variables. `=` is the **assignment operator**: it takes the value on the right and binds it to the name on the left.

```python
print(message)  # Hello, Python!
print(age)      # 30
```

## Variables can be reassigned

```python
score = 10
print(score)  # 10

score = 20
print(score)  # 20

score = score + 5
print(score)  # 25
```

Note that a variable can even change to a different *type* entirely — Python doesn't stop you:

```python
value = 42
value = "now I'm a string"
```

This is called **dynamic typing**: the type is attached to the *value*, not the variable name. This is covered more in [Data Types](/fundamentals/data-types).

## Multiple assignment

Assign several variables at once:

```python
x, y, z = 1, 2, 3
print(x, y, z)  # 1 2 3
```

Or assign the same value to multiple names:

```python
a = b = c = 0
print(a, b, c)  # 0 0 0
```

## Naming rules

A variable name:

- can contain letters, digits, and underscores (`_`)
- **cannot start with a digit**
- is **case-sensitive** (`age` and `Age` are different variables)
- cannot be a reserved keyword (`if`, `for`, `class`, `return`, etc.)

```python
user_name = "ok"      # valid
_private = "ok"       # valid
age2 = "ok"           # valid

2fast = "invalid"     # SyntaxError: starts with a digit
class = "invalid"     # SyntaxError: 'class' is a keyword
```

## Naming conventions

Python's style guide, [PEP 8](/fundamentals/code-style), recommends:

- **`snake_case`** for variables and functions: `user_name`, `total_price`
- **`UPPER_SNAKE_CASE`** for constants: `MAX_CONNECTIONS = 100`
- **`PascalCase`** for class names (covered in [Classes and Objects](/oop/classes-and-objects))

```python
first_name = "Alan"     # variable
MAX_RETRIES = 5          # constant (by convention only — Python doesn't enforce this)
```

::: tip Constants are a convention, not a rule
Python has no built-in way to make a variable truly immutable. Writing a name in `ALL_CAPS` is just a signal to other developers ("please don't reassign this") — the interpreter won't stop you if you do.
:::

## Choosing good names

Prefer names that describe *what the value represents*:

```python
# Unclear
d = 86400
x = ["Alice", "Bob", "Charlie"]

# Clear
seconds_per_day = 86400
usernames = ["Alice", "Bob", "Charlie"]
```

Clear names make code self-documenting and save you (and everyone reading your code) from re-deriving what a value means every time you see it.

**Next up:** [Data Types →](/fundamentals/data-types)
