# Dictionaries

A `dict` stores **key-value pairs**. Instead of accessing items by numeric position (like a list), you access them by a key — often a string.

## Creating a dictionary

```python
person = {
    "name": "Ada",
    "age": 36,
    "city": "London"
}

empty = {}
also_a_dict = dict(name="Ada", age=36)
```

## Accessing values

```python
person = {"name": "Ada", "age": 36}

print(person["name"])   # Ada
print(person["email"])  # KeyError: 'email'
```

Use `.get()` to avoid the error, with an optional default:

```python
print(person.get("email"))            # None
print(person.get("email", "unknown"))  # unknown
```

## Adding and updating

```python
person = {"name": "Ada", "age": 36}

person["age"] = 37                # update existing key
person["email"] = "ada@example.com"  # add new key
print(person)  # {'name': 'Ada', 'age': 37, 'email': 'ada@example.com'}

person.update({"age": 38, "city": "London"})  # update/add multiple at once
print(person)
```

## Removing items

```python
person = {"name": "Ada", "age": 36, "city": "London"}

del person["city"]
print(person)  # {'name': 'Ada', 'age': 36}

age = person.pop("age")            # removes and returns the value
print(age, person)  # 36 {'name': 'Ada'}

person.pop("missing", "default")   # returns "default" instead of raising KeyError
```

## Checking membership

```python
person = {"name": "Ada", "age": 36}

print("name" in person)     # True  — checks KEYS
print("Ada" in person)      # False — not a key
print("Ada" in person.values())  # True
```

## Iterating over a dictionary

```python
person = {"name": "Ada", "age": 36, "city": "London"}

for key in person:                     # keys by default
    print(key)

for value in person.values():           # values only
    print(value)

for key, value in person.items():       # both, unpacked
    print(f"{key}: {value}")
```

```
name
age
city
Ada
36
London
name: Ada
age: 36
city: London
```

::: tip Dictionaries preserve insertion order
Since Python 3.7, dictionaries remember the order keys were added, and iteration follows that order. This is guaranteed language behavior, not an implementation detail.
:::

## Keys, values, and hashability

Dictionary **keys** must be hashable (immutable types like `str`, `int`, `float`, `bool`, or `tuple` — never a `list` or another `dict`). Values can be absolutely anything, including other dictionaries:

```python
users = {
    1: {"name": "Ada", "role": "admin"},
    2: {"name": "Alan", "role": "editor"},
}
print(users[1]["name"])  # Ada
```

## Merging dictionaries

```python
defaults = {"theme": "light", "font_size": 12}
overrides = {"font_size": 14}

merged = defaults | overrides    # Python 3.9+
print(merged)  # {'theme': 'light', 'font_size': 14}

merged2 = {**defaults, **overrides}   # also works, any Python 3 version
```

## Dictionary comprehensions

Covered fully in [Comprehensions](/data-structures/comprehensions):

```python
squares = {n: n ** 2 for n in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

## `setdefault` and counting patterns

```python
word_counts = {}
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]

for word in words:
    word_counts[word] = word_counts.get(word, 0) + 1

print(word_counts)  # {'apple': 3, 'banana': 2, 'cherry': 1}
```

For this exact pattern, `collections.Counter` is even more convenient — see [collections](/standard-library/collections-module).

**Next up:** [Sets →](/data-structures/sets)
