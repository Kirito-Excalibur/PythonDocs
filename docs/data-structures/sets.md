# Sets

A `set` is an **unordered** collection of **unique** items. If lists are for "all my items, in order, duplicates allowed," sets are for "which distinct items do I have, and is a given item among them?"

## Creating a set

```python
fruits = {"apple", "banana", "cherry"}
also_a_set = set(["apple", "banana", "apple"])   # duplicates removed automatically
print(also_a_set)  # {'apple', 'banana'}

empty = set()    # NOT {} — that creates an empty dict!
```

::: warning Careful! `{}` is an empty dict, not an empty set
```python
x = {}
print(type(x))   # <class 'dict'>

x = set()
print(type(x))   # <class 'set'>
```
:::

## Sets are unordered and contain no duplicates

```python
numbers = {3, 1, 4, 1, 5, 9, 2, 6, 5}
print(numbers)   # {1, 2, 3, 4, 5, 6, 9} — order not guaranteed, duplicates gone
```

Because there's no order, sets don't support indexing: `numbers[0]` raises a `TypeError`.

## Adding and removing items

```python
fruits = {"apple", "banana"}

fruits.add("cherry")
print(fruits)  # {'apple', 'banana', 'cherry'}

fruits.remove("banana")    # KeyError if not present
fruits.discard("mango")    # does nothing if not present — no error
popped = fruits.pop()       # removes and returns an arbitrary item
```

## Membership testing — the main reason to use a set

Checking `in` on a set is dramatically faster than on a list for large collections, because sets use hashing internally (roughly constant time, versus scanning a list item by item):

```python
allowed_users = {"ada", "alan", "grace"}

print("ada" in allowed_users)      # True — very fast, even with millions of entries
```

## Set operations (real math-style sets)

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)   # {1, 2, 3, 4, 5, 6}   union — all items in either
print(a & b)   # {3, 4}               intersection — items in both
print(a - b)   # {1, 2}               difference — in a but not b
print(a ^ b)   # {1, 2, 5, 6}         symmetric difference — in exactly one

print(a.issubset({1, 2, 3, 4, 5}))    # True
print(a.issuperset({1, 2}))            # True
print(a.isdisjoint({100, 200}))        # True — no overlap
```

These map directly onto the equivalent methods, if you prefer named calls: `a.union(b)`, `a.intersection(b)`, `a.difference(b)`, `a.symmetric_difference(b)`.

## A practical example: removing duplicates

```python
names = ["Ada", "Alan", "Ada", "Grace", "Alan"]
unique_names = list(set(names))
print(unique_names)   # order not guaranteed, e.g. ['Grace', 'Ada', 'Alan']
```

::: tip
Converting to a set and back to a list is the standard idiom for de-duplicating, but it discards ordering. If you need to preserve order while removing duplicates, use `dict.fromkeys()` instead (dicts preserve insertion order):
```python
unique_names = list(dict.fromkeys(names))
print(unique_names)  # ['Ada', 'Alan', 'Grace'] — original order kept
```
:::

## `frozenset` — an immutable set

Just like tuples are the immutable counterpart to lists, `frozenset` is the immutable counterpart to `set`. Because it's immutable, it's hashable and can be used as a dictionary key or an item inside another set:

```python
frozen = frozenset([1, 2, 3])
frozen.add(4)   # AttributeError — frozensets have no add() method

nested = {frozenset([1, 2]), frozenset([3, 4])}  # works fine
```

## Set comprehensions

```python
evens = {n for n in range(10) if n % 2 == 0}
print(evens)  # {0, 2, 4, 6, 8}
```

More in [Comprehensions](/data-structures/comprehensions).

**Next up:** [Comprehensions →](/data-structures/comprehensions)
