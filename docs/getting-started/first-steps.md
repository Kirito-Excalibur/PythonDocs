# Your First Program

## Hello, World!

Create a file named `hello.py` with this single line:

```python
print("Hello, World!")
```

Run it:

```bash
python3 hello.py
```

```
Hello, World!
```

`print()` is a **built-in function** — it's always available, no setup required — that writes text to the screen. You'll use it constantly, especially while learning, to see what your code is actually doing.

## Comments

A comment is text the interpreter ignores completely. Use `#` for a single-line comment:

```python
# This line explains what's happening below
print("Hello, World!")  # this runs; the comment does not
```

For multi-line explanations, Python has no dedicated block-comment syntax — most style guides recommend just stacking `#` lines:

```python
# This function calculates the area of a circle.
# It expects the radius as a float and returns a float.
def circle_area(radius):
    return 3.14159 * radius ** 2
```

::: tip
A triple-quoted string (`"""..."""`) placed on its own is sometimes used as a makeshift multi-line comment, but its real, intended use is **docstrings** — documentation attached to functions and classes. We'll cover those in [Functions](/fundamentals/functions).
:::

## Printing multiple things

`print()` accepts multiple values, separated by commas, and joins them with a space automatically:

```python
print("The answer is", 42)
```

```
The answer is 42
```

You can change the separator and the line ending:

```python
print("a", "b", "c", sep="-")       # a-b-c
print("no newline after this", end="")
print(" ...continues right here")
```

```
a-b-c
no newline after this ...continues right here
```

## Indentation matters

This is the biggest structural difference from most other languages: **Python uses indentation to define code blocks**, instead of curly braces `{ }`.

```python
if 5 > 2:
    print("5 is greater than 2")
    print("This is still inside the if-block")
print("This is outside the if-block")
```

```
5 is greater than 2
This is still inside the if-block
This is outside the if-block
```

Every line indented at the same level belongs to the same block. Mixing tabs and spaces, or indenting inconsistently, causes an `IndentationError`.

::: warning Careful!
Python doesn't care *how much* you indent (2 spaces, 4 spaces, a tab), only that it's **consistent** within a block. The overwhelming convention — used in essentially all Python code you'll encounter — is **4 spaces per indent level**. Configure your editor to insert 4 spaces when you press Tab, and never mix tabs with spaces in the same file.
:::

## A slightly bigger example

Let's put together what you've seen so far:

```python
# A tiny greeting program

def greet(name):
    """Return a friendly greeting for the given name."""
    return f"Hello, {name}! Welcome to Python."

user_name = "Grace"
message = greet(user_name)
print(message)
```

```
Hello, Grace! Welcome to Python.
```

Every piece here — functions, variables, f-strings — gets its own detailed chapter next. For now, the goal is just to get comfortable running code and seeing output.

**Next up:** Chapter 2 — [Variables →](/fundamentals/variables)
