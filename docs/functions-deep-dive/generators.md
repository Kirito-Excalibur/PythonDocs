# Generators

A **generator** is the easy way to build an [iterator](/functions-deep-dive/iterators) — instead of writing a class with `__iter__`/`__next__`, you write a regular-looking function that uses `yield`.

## `yield` vs `return`

```python
def count_up_to(limit):
    current = 1
    while current <= limit:
        yield current
        current += 1

for number in count_up_to(5):
    print(number)
```

```
1
2
3
4
5
```

Calling `count_up_to(5)` doesn't run the function body at all — it immediately returns a **generator object**. The body only starts executing when you iterate over it, and it runs *up to* the next `yield`, pauses there, and hands back that value. The next call to `next()` resumes exactly where it left off, with all local variables intact.

```python
gen = count_up_to(3)
print(gen)          # <generator object count_up_to at 0x...>

print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3
print(next(gen))  # StopIteration
```

## Why use generators: laziness and memory

The critical advantage is that values are produced **one at a time, on demand**, instead of all at once in memory:

```python
def all_squares(n):
    return [x ** 2 for x in range(n)]   # builds the ENTIRE list in memory

def square_generator(n):
    for x in range(n):
        yield x ** 2                     # produces ONE value at a time

# This would try to allocate a list of 100 million items:
# huge_list = all_squares(100_000_000)

# This uses almost no memory, no matter how large n is:
huge_gen = square_generator(100_000_000)
print(next(huge_gen))  # 0
print(next(huge_gen))  # 1
```

This matters enormously when processing large files, streams, or infinite sequences.

## An infinite generator

Since values are only computed when requested, a generator can represent a sequence that never ends:

```python
def natural_numbers():
    n = 1
    while True:
        yield n
        n += 1

numbers = natural_numbers()
for _ in range(5):
    print(next(numbers))
```

```
1
2
3
4
5
```

Never try to `list()` an infinite generator directly — it will run forever trying to exhaust it.

## Generator expressions

The comprehension-style shorthand for simple generators, introduced in [Comprehensions](/data-structures/comprehensions):

```python
squares = (x ** 2 for x in range(10))
print(sum(squares))  # 285 — consumed directly, no intermediate list built
```

## Practical example: reading a huge file line by line

```python
def read_large_file(path):
    with open(path) as f:
        for line in f:
            yield line.strip()

for line in read_large_file("huge_log.txt"):
    if "ERROR" in line:
        print(line)
```

This processes the file one line at a time, regardless of whether it's 10 lines or 10 gigabytes — the whole file is never loaded into memory at once.

## Chaining generators

Generators compose well, since each one lazily pulls from the next:

```python
def integers():
    n = 1
    while True:
        yield n
        n += 1

def squares(seq):
    for n in seq:
        yield n ** 2

def take(seq, count):
    for i, item in enumerate(seq):
        if i >= count:
            break
        yield item

result = list(take(squares(integers()), 5))
print(result)  # [1, 4, 9, 16, 25]
```

Nothing is computed until `list()` actually pulls values through the whole chain — this "pipeline" style is a hallmark of idiomatic generator use.

## `yield from`

Delegates to another iterable, flattening it into the current generator:

```python
def chain(*iterables):
    for iterable in iterables:
        yield from iterable

result = list(chain([1, 2], [3, 4], "ab"))
print(result)  # [1, 2, 3, 4, 'a', 'b']
```

**Next up:** [Recursion →](/functions-deep-dive/recursion)
