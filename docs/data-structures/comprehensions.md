# Comprehensions

A comprehension is a compact way to build a list, dict, or set from an existing iterable, in a single readable expression.

## List comprehensions

The basic form: `[expression for item in iterable]`

```python
numbers = [1, 2, 3, 4, 5]

squares = [n ** 2 for n in numbers]
print(squares)  # [1, 4, 9, 16, 25]
```

This is equivalent to the more verbose loop:

```python
squares = []
for n in numbers:
    squares.append(n ** 2)
```

### Adding a condition (filtering)

`[expression for item in iterable if condition]`

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

evens = [n for n in numbers if n % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]
```

### Conditional expression inside the comprehension

Don't confuse filtering (`if` at the end) with a value-choosing ternary (`if`/`else` right after the expression):

```python
numbers = [1, 2, 3, 4, 5]

labels = ["even" if n % 2 == 0 else "odd" for n in numbers]
print(labels)  # ['odd', 'even', 'odd', 'even', 'odd']
```

### Nested loops in a comprehension

```python
pairs = [(x, y) for x in range(3) for y in range(2)]
print(pairs)
# [(0, 0), (0, 1), (1, 0), (1, 1), (2, 0), (2, 1)]
```

This reads left-to-right the same as nested `for` loops would be written:

```python
pairs = []
for x in range(3):
    for y in range(2):
        pairs.append((x, y))
```

### Flattening a nested list

```python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Dictionary comprehensions

`{key_expr: value_expr for item in iterable}`

```python
names = ["Ada", "Alan", "Grace"]
name_lengths = {name: len(name) for name in names}
print(name_lengths)  # {'Ada': 3, 'Alan': 4, 'Grace': 5}
```

```python
prices = {"apple": 0.5, "banana": 0.3, "cherry": 3.0}
discounted = {item: round(price * 0.9, 2) for item, price in prices.items()}
print(discounted)  # {'apple': 0.45, 'banana': 0.27, 'cherry': 2.7}
```

## Set comprehensions

`{expression for item in iterable}`

```python
words = ["apple", "banana", "cherry", "date"]
first_letters = {word[0] for word in words}
print(first_letters)  # {'a', 'b', 'c', 'd'}
```

## Generator expressions

Same syntax as a list comprehension, but with `()` instead of `[]` — produces items **lazily**, one at a time, instead of building the whole list in memory up front:

```python
squares = (n ** 2 for n in range(1_000_000))
print(squares)          # <generator object <genexpr> at 0x...>
print(next(squares))    # 0
print(next(squares))    # 1
```

For huge or infinite sequences, this saves a massive amount of memory compared to a list comprehension. See [Generators](/functions-deep-dive/generators) for the full picture.

```python
# Passing a generator expression directly to a function (no extra parens needed)
total = sum(n ** 2 for n in range(1000))
print(total)
```

## When to use a comprehension vs a loop

Comprehensions are great when the transformation is a single, simple expression. Once the logic gets more complex — multiple conditions, side effects, several lines — a regular `for` loop is more readable:

```python
# Fine as a comprehension
squares = [n ** 2 for n in range(10)]

# Better as a regular loop — too much going on for one line
results = []
for item in data:
    if item.is_valid():
        processed = transform(item)
        log(processed)
        results.append(processed)
```

::: tip Rule of thumb
If you find yourself writing a comprehension with more than one `if` or nested loop, or squinting to parse it, switch to a plain `for` loop. Readability counts.
:::

**Next up:** [Unpacking →](/data-structures/unpacking)
