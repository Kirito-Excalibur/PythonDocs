# Loops

Loops let you repeat code without copy-pasting it. Python has two loop constructs: `for` and `while`.

## `for` loops

A `for` loop iterates over the items of a sequence (a list, string, range, etc.), one at a time:

```python
for fruit in ["apple", "banana", "cherry"]:
    print(fruit)
```

```
apple
banana
cherry
```

::: tip
Python's `for` is really a "for-each" loop — it always iterates over the elements of something iterable. There's no C-style `for (int i = 0; i < 10; i++)` in Python; you get the same effect with `range()` below.
:::

### Looping a fixed number of times with `range()`

```python
for i in range(5):
    print(i)
```

```
0
1
2
3
4
```

`range()` has three forms:

```python
range(5)         # 0, 1, 2, 3, 4          (stop)
range(2, 5)      # 2, 3, 4                (start, stop)
range(0, 10, 2)  # 0, 2, 4, 6, 8          (start, stop, step)
range(10, 0, -1) # 10, 9, 8, ... 1         (negative step counts down)
```

Note that `stop` is always **exclusive** — `range(5)` never includes `5`.

### Looping with both index and value: `enumerate()`

```python
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(index, fruit)
```

```
0 apple
1 banana
2 cherry
```

This is almost always preferable to manually managing an index with `range(len(fruits))`.

### Looping over a dictionary

```python
prices = {"apple": 0.5, "banana": 0.3}

for key in prices:                 # iterates over keys by default
    print(key)

for key, value in prices.items():  # iterates over key-value pairs
    print(key, value)
```

```
apple
banana
apple 0.5
banana 0.3
```

More on dictionaries in [Dictionaries](/data-structures/dictionaries).

## `while` loops

Repeats as long as a condition stays `True`:

```python
count = 0

while count < 5:
    print(count)
    count += 1
```

```
0
1
2
3
4
```

Use `while` when you don't know in advance how many iterations you'll need:

```python
import random

target = random.randint(1, 10)
guess = None

while guess != target:
    guess = int(input("Guess a number 1-10: "))

print("Correct!")
```

::: warning Careful! Infinite loops
If the condition in a `while` loop never becomes `False`, the loop never ends. This is the single most common beginner bug with `while`:
```python
count = 0
while count < 5:
    print(count)
    # forgot count += 1  — this never terminates!
```
Always double-check that something inside the loop body moves you toward the exit condition.
:::

## `break` and `continue`

`break` exits the loop immediately:

```python
for number in range(10):
    if number == 5:
        break
    print(number)
```

```
0
1
2
3
4
```

`continue` skips the rest of the current iteration and moves to the next one:

```python
for number in range(6):
    if number % 2 == 0:
        continue
    print(number)
```

```
1
3
5
```

## The `else` clause on loops

This is a genuinely unusual Python feature: `for` and `while` loops can have an `else` block, which runs only if the loop finished **without** hitting a `break`:

```python
for number in range(2, 10):
    if number % 7 == 0:
        print(f"{number} is divisible by 7")
        break
else:
    print("No number in range was divisible by 7")
```

This is most useful for "search" loops — did we find what we were looking for, or exhaust the whole sequence?

## Nested loops

```python
for i in range(3):
    for j in range(2):
        print(f"i={i}, j={j}")
```

```
i=0, j=0
i=0, j=1
i=1, j=0
i=1, j=1
i=2, j=0
i=2, j=1
```

`break` and `continue` only affect the **innermost** loop they're written in.

**Next up:** [Functions →](/fundamentals/functions)
