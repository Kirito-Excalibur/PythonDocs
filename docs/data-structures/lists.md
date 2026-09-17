# Lists

A `list` is an ordered, **mutable** collection of items. It's the most commonly used data structure in Python.

## Creating a list

```python
fruits = ["apple", "banana", "cherry"]
mixed = [1, "two", 3.0, True]   # lists can hold different types
empty = []
```

## Indexing and slicing

Same rules as strings (see [Strings](/fundamentals/strings)):

```python
fruits = ["apple", "banana", "cherry", "date"]

print(fruits[0])     # apple
print(fruits[-1])    # date
print(fruits[1:3])   # ['banana', 'cherry']
print(fruits[::-1])  # ['date', 'cherry', 'banana', 'apple']
```

## Lists are mutable

```python
fruits = ["apple", "banana", "cherry"]
fruits[0] = "avocado"
print(fruits)  # ['avocado', 'banana', 'cherry']
```

## Adding items

```python
fruits = ["apple", "banana"]

fruits.append("cherry")            # add to the end
print(fruits)  # ['apple', 'banana', 'cherry']

fruits.insert(1, "apricot")        # insert at a specific index
print(fruits)  # ['apple', 'apricot', 'banana', 'cherry']

fruits.extend(["date", "elderberry"])  # add multiple items
print(fruits)  # ['apple', 'apricot', 'banana', 'cherry', 'date', 'elderberry']
```

::: warning Careful! `append` vs `extend`
```python
a = [1, 2]
a.append([3, 4])
print(a)   # [1, 2, [3, 4]]  — the whole list is added as ONE item

b = [1, 2]
b.extend([3, 4])
print(b)   # [1, 2, 3, 4]    — each item is added individually
```
:::

## Removing items

```python
fruits = ["apple", "banana", "cherry", "banana"]

fruits.remove("banana")     # removes the FIRST matching value
print(fruits)  # ['apple', 'cherry', 'banana']

last = fruits.pop()          # removes and returns the last item
print(last, fruits)  # banana ['apple', 'cherry']

first = fruits.pop(0)        # removes and returns item at index 0
print(first, fruits)  # apple ['cherry']

del fruits[0]                 # removes by index, returns nothing
fruits.clear()                # removes everything -> []
```

## Searching and counting

```python
numbers = [4, 2, 7, 2, 9]

print(2 in numbers)           # True
print(numbers.index(7))       # 2 — index of first match
print(numbers.count(2))       # 2 — how many times 2 appears
print(len(numbers))           # 5
```

## Sorting

```python
numbers = [4, 2, 7, 2, 9]

numbers.sort()                    # sorts IN PLACE, returns None
print(numbers)  # [2, 2, 4, 7, 9]

numbers.sort(reverse=True)
print(numbers)  # [9, 7, 4, 2, 2]

original = [4, 2, 7]
new_list = sorted(original)       # returns a NEW sorted list, leaves original unchanged
print(original, new_list)  # [4, 2, 7] [2, 4, 7]
```

Sort by a custom key using a lambda (see [Lambda Functions](/fundamentals/lambda-functions)):

```python
words = ["banana", "kiwi", "apple", "fig"]
words.sort(key=len)
print(words)  # ['fig', 'kiwi', 'apple', 'banana']
```

## Combining lists

```python
a = [1, 2, 3]
b = [4, 5, 6]

combined = a + b
print(combined)  # [1, 2, 3, 4, 5, 6]

repeated = a * 3
print(repeated)  # [1, 2, 3, 1, 2, 3, 1, 2, 3]
```

## Copying a list

```python
original = [1, 2, 3]

reference = original          # NOT a copy — same list, two names
reference.append(4)
print(original)  # [1, 2, 3, 4]  — original changed too!

copy = original.copy()        # a real, independent copy
# or: copy = original[:]
# or: copy = list(original)
copy.append(5)
print(original)  # [1, 2, 3, 4]  — unaffected
print(copy)       # [1, 2, 3, 4, 5]
```

::: warning Careful! Shallow copies
`.copy()` is a **shallow** copy: nested mutable objects (like a list of lists) are still shared between the original and the copy. For a fully independent copy of nested data, use `copy.deepcopy()`:
```python
import copy

original = [[1, 2], [3, 4]]
shallow = original.copy()
shallow[0].append(99)
print(original)  # [[1, 2, 99], [3, 4]] — inner list was shared!

deep = copy.deepcopy(original)
deep[0].append(100)
print(original)  # unaffected by changes to deep
```
:::

## Iterating over a list

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)

for index, fruit in enumerate(fruits):
    print(index, fruit)
```

## Useful built-ins with lists

```python
numbers = [4, 2, 7, 9, 2]

print(len(numbers))    # 5
print(min(numbers))    # 2
print(max(numbers))    # 9
print(sum(numbers))    # 24
print(list(reversed(numbers)))  # [2, 9, 7, 2, 4]
```

**Next up:** [Tuples →](/data-structures/tuples)
