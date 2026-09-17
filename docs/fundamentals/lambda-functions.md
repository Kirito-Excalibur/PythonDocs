# Lambda Functions

A **lambda** is a small, anonymous (unnamed) function, defined in a single expression.

## Syntax

```python
square = lambda x: x ** 2
print(square(5))  # 25
```

This is equivalent to:

```python
def square(x):
    return x ** 2
```

The lambda form is: `lambda parameters: expression`. Whatever the expression evaluates to is returned automatically — there's no `return` keyword, and a lambda body can only be a single expression, not a series of statements.

## Multiple parameters

```python
add = lambda a, b: a + b
print(add(3, 4))  # 7
```

## Where lambdas are actually used

Lambdas are rarely assigned to a variable like above — if you're naming it, a regular `def` is clearer and gives you a proper docstring and traceback name. Lambdas shine as **throwaway functions passed as arguments**, especially to `sorted()`, `map()`, `filter()`, and similar functions.

### With `sorted()`

```python
people = [("Ada", 36), ("Alan", 41), ("Grace", 85)]

# Sort by age (the second item in each tuple)
people.sort(key=lambda person: person[1])
print(people)
```

```
[('Ada', 36), ('Alan', 41), ('Grace', 85)]
```

### With `map()`

`map()` applies a function to every item of an iterable:

```python
numbers = [1, 2, 3, 4]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16]
```

### With `filter()`

`filter()` keeps only the items for which the function returns `True`:

```python
numbers = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6]
```

::: tip List comprehensions are often clearer
Both examples above are commonly rewritten with a [comprehension](/data-structures/comprehensions), which most Python developers find more readable:
```python
squared = [x ** 2 for x in numbers]
evens = [x for x in numbers if x % 2 == 0]
```
Reach for `map`/`filter`/`lambda` when it genuinely reads better — often as a one-off `key=` argument — not as your default tool for transforming lists.
:::

## Limitations

Lambdas can only contain a single expression — no `if`/`else` statements, no loops, no multiple lines. A conditional *expression* (the ternary form) is allowed, though:

```python
classify = lambda n: "even" if n % 2 == 0 else "odd"
print(classify(7))   # odd
print(classify(10))  # even
```

If your logic needs more than one line, write a proper `def` function instead.

**Next up:** [Scope →](/fundamentals/scope)
