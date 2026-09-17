# Scope

Scope determines where in your code a variable name can be seen and used. Python resolves names using the **LEGB** rule: Local, Enclosing, Global, Built-in.

## Local scope

A variable created inside a function only exists inside that function:

```python
def greet():
    message = "Hello!"
    print(message)

greet()          # Hello!
print(message)   # NameError: name 'message' is not defined
```

`message` is **local** to `greet` — it's created when the function runs and destroyed when it returns.

## Global scope

A variable created at the top level of a script (outside any function) is **global** — visible everywhere, including inside functions:

```python
count = 0

def show_count():
    print(count)   # can READ the global variable just fine

show_count()  # 0
```

## Reading vs. reassigning a global variable

Reading a global variable from inside a function works automatically. **Reassigning** one does not — Python assumes any name you assign to inside a function is local, unless told otherwise:

```python
count = 0

def increment():
    count += 1   # UnboundLocalError!

increment()
```

This fails because `count += 1` is really `count = count + 1` — an assignment — so Python treats `count` as a new local variable, then complains it's referenced before being assigned.

Fix it with the `global` keyword:

```python
count = 0

def increment():
    global count
    count += 1

increment()
increment()
print(count)  # 2
```

::: warning Careful! Overusing `global`
Needing `global` a lot is often a sign your function should instead take a parameter and return a value:
```python
def increment(count):
    return count + 1

count = 0
count = increment(count)
count = increment(count)
print(count)  # 2
```
This version is easier to test and reason about — the function has no hidden dependency on outside state.
:::

## Enclosing scope (nested functions)

A function defined inside another function can read variables from the outer (enclosing) function:

```python
def outer():
    message = "Hi from outer"

    def inner():
        print(message)   # reads from the enclosing scope

    inner()

outer()  # Hi from outer
```

To *reassign* an enclosing variable from a nested function, use `nonlocal` (the sibling of `global`, but for enclosing rather than module-level scope):

```python
def make_counter():
    count = 0

    def increment():
        nonlocal count
        count += 1
        return count

    return increment

counter = make_counter()
print(counter())  # 1
print(counter())  # 2
print(counter())  # 3
```

This pattern — a function that returns another function which remembers variables from its enclosing scope — is called a **closure**, covered in detail in [Closures](/functions-deep-dive/closures).

## Built-in scope

The outermost scope, containing names Python provides automatically: `print`, `len`, `range`, `int`, and so on. You can technically shadow these (`list = [1, 2, 3]`), but avoid it — it hides the real built-in for the rest of that scope.

## The LEGB lookup order, summarized

```python
x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(x)   # looks locally first -> "local"

    inner()

outer()
print(x)  # "global" — unaffected by the functions above
```

Python searches **L**ocal → **E**nclosing → **G**lobal → **B**uilt-in, and uses the first match it finds.

**Next up:** [Code Style (PEP 8) →](/fundamentals/code-style)
