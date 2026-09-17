# Iterators

Every time you write `for item in something:`, Python is using the **iterator protocol** behind the scenes. Understanding it demystifies a lot of "magic" behavior and sets up [Generators](/functions-deep-dive/generators), which are the easy way to build your own iterators.

## Iterable vs. iterator

These two words sound similar but mean different things:

- An **iterable** is anything you can loop over — it has an `__iter__` method that produces an iterator. Lists, tuples, strings, dicts, sets, and files are all iterables.
- An **iterator** is the object that actually does the stepping — it has a `__next__` method that produces the next value, one at a time, and raises `StopIteration` when there's nothing left.

```python
numbers = [1, 2, 3]        # numbers is an ITERABLE

iterator = iter(numbers)   # get an ITERATOR from it
print(type(iterator))      # <class 'list_iterator'>

print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3
print(next(iterator))  # StopIteration!
```

A `for` loop is essentially sugar for this exact pattern:

```python
iterator = iter(numbers)
while True:
    try:
        item = next(iterator)
    except StopIteration:
        break
    print(item)
```

## Key difference: iterators are exhausted after one pass

```python
numbers = [1, 2, 3]
iterator = iter(numbers)

print(list(iterator))  # [1, 2, 3]
print(list(iterator))  # [] — already exhausted!

print(list(numbers))   # [1, 2, 3] — the original list is unaffected
```

The list `numbers` is iterable *repeatedly* because calling `iter()` on it creates a brand-new iterator each time. The iterator itself, once consumed, is spent.

## Writing your own iterator class

An object becomes iterable by implementing `__iter__` (returning an iterator), and becomes an iterator by implementing both `__iter__` (returning itself) and `__next__`:

```python
class CountUp:
    def __init__(self, limit):
        self.limit = limit
        self.current = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= self.limit:
            raise StopIteration
        self.current += 1
        return self.current

for number in CountUp(5):
    print(number)
```

```
1
2
3
4
5
```

Because `CountUp` also works with `for`, `list()`, `sum()`, and anything else expecting an iterable — Python doesn't care about the specific type, only that it follows the protocol. This is Python's approach to **duck typing**: "if it walks like a duck and quacks like a duck..."

## Why this matters in practice

You rarely need to hand-write a class like `CountUp` — [generators](/functions-deep-dive/generators) give you the same capability with far less code. But understanding the underlying protocol explains:

- why you can only loop over a file's lines once without reopening it
- why `next(some_iterator)` works, and what `StopIteration` means when you see it in a traceback
- how `for`, list comprehensions, `sum()`, `sorted()`, and unpacking all cooperate through one shared interface

**Next up:** [Generators →](/functions-deep-dive/generators)
