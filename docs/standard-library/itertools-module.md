# itertools

`itertools` provides fast, memory-efficient tools for working with iterators — building on the ideas introduced in [Iterators](/functions-deep-dive/iterators) and [Generators](/functions-deep-dive/generators).

## `chain` — combine multiple iterables into one

```python
from itertools import chain

a = [1, 2, 3]
b = [4, 5, 6]

for item in chain(a, b):
    print(item)
```

```
1
2
3
4
5
6
```

Equivalent to `a + b` for lists, but works with *any* iterables (including generators), and doesn't build an intermediate combined list in memory.

## `count` — an infinite counter

```python
from itertools import count

for number in count(start=10, step=5):
    if number > 30:
        break
    print(number)
```

```
10
15
20
25
30
```

## `cycle` — repeat a sequence forever

```python
from itertools import cycle, islice

colors = cycle(["red", "green", "blue"])
first_seven = list(islice(colors, 7))
print(first_seven)
```

```
['red', 'green', 'blue', 'red', 'green', 'blue', 'red']
```

## `islice` — slicing for iterators

Regular slicing (`some_list[2:5]`) doesn't work on generic iterators, since they don't support indexing. `islice` provides the equivalent for any iterable:

```python
from itertools import islice, count

numbers = count(1)              # infinite: 1, 2, 3, ...
first_five = list(islice(numbers, 5))
print(first_five)   # [1, 2, 3, 4, 5]
```

## `combinations` and `permutations`

```python
from itertools import combinations, permutations

letters = ["A", "B", "C"]

print(list(combinations(letters, 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'C')]  -- order doesn't matter, no repeats

print(list(permutations(letters, 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]
# -- order matters
```

`combinations` gives you every way to *choose* a subset (unordered); `permutations` gives you every way to *arrange* a subset (ordered).

## `product` — cartesian product (nested loops, flattened)

```python
from itertools import product

sizes = ["S", "M", "L"]
colors = ["red", "blue"]

for size, color in product(sizes, colors):
    print(size, color)
```

```
S red
S blue
M red
M blue
L red
L blue
```

This replaces a nested `for` loop:

```python
for size in sizes:
    for color in colors:
        print(size, color)
```

## `groupby` — group consecutive items

```python
from itertools import groupby

data = [1, 1, 2, 2, 2, 3, 1, 1]

for key, group in groupby(data):
    print(key, list(group))
```

```
1 [1, 1]
2 [2, 2, 2]
3 [3]
1 [1, 1]
```

::: warning Careful! `groupby` only groups CONSECUTIVE items
Notice `1` appears as a group twice above, since the data wasn't sorted first. If you want *all* items with the same key grouped together regardless of position, sort the data by the same key before calling `groupby`:
```python
data = sorted([1, 1, 2, 2, 2, 3, 1, 1])
for key, group in groupby(data):
    print(key, list(group))
# 1 [1, 1, 1, 1]
# 2 [2, 2, 2]
# 3 [3]
```
:::

## `zip_longest` — like `zip`, but keeps going

Built-in `zip()` stops at the shortest input; `zip_longest` continues to the longest, filling gaps with a default value:

```python
from itertools import zip_longest

names = ["Ada", "Alan", "Grace"]
scores = [90, 85]

print(list(zip(names, scores)))
# [('Ada', 90), ('Alan', 85)]  -- "Grace" is dropped, since scores ran out

print(list(zip_longest(names, scores, fillvalue=0)))
# [('Ada', 90), ('Alan', 85), ('Grace', 0)]
```

**Next up:** [functools →](/standard-library/functools-module)
