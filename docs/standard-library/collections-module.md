# collections

The `collections` module provides specialized alternatives to Python's general-purpose `dict`, `list`, and `tuple` — each optimized for a specific, common pattern.

## `Counter` — counting things

The single most-used tool in this module. Counts occurrences of items in any iterable:

```python
from collections import Counter

words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = Counter(words)

print(counts)                # Counter({'apple': 3, 'banana': 2, 'cherry': 1})
print(counts["apple"])        # 3
print(counts["nonexistent"])  # 0 — no KeyError, unlike a regular dict!

print(counts.most_common(2))  # [('apple', 3), ('banana', 2)]
```

Compare this to the manual approach shown in [Dictionaries](/data-structures/dictionaries) — `Counter` does the same job in one line:

```python
# Manual version
word_counts = {}
for word in words:
    word_counts[word] = word_counts.get(word, 0) + 1

# With Counter
word_counts = Counter(words)
```

`Counter` also supports arithmetic between counts:

```python
a = Counter(["a", "b", "b"])
b = Counter(["b", "c"])

print(a + b)   # Counter({'b': 3, 'a': 1, 'c': 1})
print(a - b)   # Counter({'a': 1, 'b': 1})
```

## `defaultdict` — dictionaries with automatic default values

Eliminates the need to check "does this key exist yet?" before appending to it:

```python
from collections import defaultdict

# Without defaultdict
groups = {}
for name in ["Ada", "Alan", "Amy", "Bob"]:
    first_letter = name[0]
    if first_letter not in groups:
        groups[first_letter] = []
    groups[first_letter].append(name)

# With defaultdict — no existence check needed
groups = defaultdict(list)
for name in ["Ada", "Alan", "Amy", "Bob"]:
    groups[name[0]].append(name)

print(dict(groups))   # {'A': ['Ada', 'Alan', 'Amy'], 'B': ['Bob']}
```

`defaultdict(list)` means: whenever a missing key is accessed, automatically create it with an empty `list()` as its value, instead of raising `KeyError`. You can pass any zero-argument callable — `list`, `int` (defaults to `0`), `set`, or your own function.

## `namedtuple` — lightweight, readable records

Already introduced in [Tuples](/data-structures/tuples):

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)   # 3 4
```

## `deque` — a fast double-ended queue

A list-like structure optimized for adding/removing from **both ends**, unlike a regular `list`, which is only fast at the end:

```python
from collections import deque

d = deque([1, 2, 3])

d.append(4)          # add to the right
d.appendleft(0)       # add to the left
print(d)   # deque([0, 1, 2, 3, 4])

d.pop()               # remove from the right
d.popleft()            # remove from the left
print(d)   # deque([1, 2, 3])
```

Regular lists are slow (`O(n)`) when inserting or removing at the *front*, since every other element has to shift over. `deque` does this in constant time (`O(1)`), making it the right choice for queues, sliding windows, and "recent items" buffers:

```python
recent_actions = deque(maxlen=3)   # automatically discards the oldest item

for action in ["login", "click", "scroll", "logout"]:
    recent_actions.append(action)

print(recent_actions)   # deque(['click', 'scroll', 'logout'], maxlen=3)
```

## `OrderedDict` — mostly historical now

Before Python 3.7, regular dicts didn't guarantee insertion order, so `OrderedDict` existed specifically for that. Since ordinary dicts now preserve order by default (see [Dictionaries](/data-structures/dictionaries)), `OrderedDict` is rarely needed for new code — you'll mostly encounter it in older codebases.

**Next up:** [itertools →](/standard-library/itertools-module)
