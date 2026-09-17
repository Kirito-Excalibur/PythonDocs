# User Input & Output

## Output with `print()`

You've already used `print()` throughout this tutorial. A quick reference for its options:

```python
print("Hello")                          # Hello
print("a", "b", "c")                    # a b c
print("a", "b", "c", sep=", ")          # a, b, c
print("no newline", end="")             # stays on the same line as what follows
print("x =", 5, "y =", 10)              # x = 5 y = 10
```

## Reading input with `input()`

`input()` pauses the program, displays an optional prompt, and waits for the user to type something and press Enter:

```python
name = input("What's your name? ")
print(f"Hello, {name}!")
```

```
What's your name? Ada
Hello, Ada!
```

::: warning Careful! `input()` always returns a string
Even if the user types a number, you get back a `str`:
```python
age = input("Enter your age: ")
print(type(age))   # <class 'str'>, even if they typed "25"
```
Convert it explicitly if you need a number — see [Type Conversion](/fundamentals/type-conversion):
```python
age = int(input("Enter your age: "))
print(age + 1)
```
:::

## A complete input/output example

```python
name = input("Name: ")
age = int(input("Age: "))

birth_year = 2026 - age
print(f"Hi {name}, you were probably born around {birth_year}.")
```

```
Name: Ada
Age: 36
Hi Ada, you were probably born around 1990.
```

## Validating input safely

Since converting bad input raises an error, wrap it in `try`/`except` (fully covered in [Exceptions](/error-handling/exceptions)):

```python
raw = input("Enter a number: ")

try:
    number = int(raw)
    print(f"You entered {number}")
except ValueError:
    print("That wasn't a valid whole number.")
```

## Printing to standard error

By default `print()` writes to **stdout**. To write to **stderr** instead (useful for error messages that shouldn't mix with normal output):

```python
import sys
print("Something went wrong!", file=sys.stderr)
```

We'll cover `sys` more in [os and sys](/standard-library/os-and-sys).

**Next up:** [Conditionals →](/fundamentals/conditionals)
