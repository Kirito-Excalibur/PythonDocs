# Recursion

A recursive function is one that calls itself, working toward a **base case** that stops the recursion.

## A basic example: factorial

```python
def factorial(n):
    if n <= 1:          # base case
        return 1
    return n * factorial(n - 1)   # recursive case

print(factorial(5))  # 120
```

Tracing through `factorial(5)`:

```
factorial(5) = 5 * factorial(4)
             = 5 * (4 * factorial(3))
             = 5 * (4 * (3 * factorial(2)))
             = 5 * (4 * (3 * (2 * factorial(1))))
             = 5 * (4 * (3 * (2 * 1)))
             = 120
```

## The two essential parts

Every correct recursive function needs:

1. **A base case** — a condition where the function returns a value directly, without calling itself. Without this, the recursion never stops.
2. **A recursive case** — where the function calls itself with an input that's *closer* to the base case.

```python
def countdown(n):
    if n <= 0:               # base case
        print("Liftoff!")
        return
    print(n)
    countdown(n - 1)          # recursive case, moving toward the base case

countdown(3)
```

```
3
2
1
Liftoff!
```

## Recursion vs iteration

Anything recursion can do, a loop can also do — recursion is a style choice, not a unique capability. It tends to read more naturally for problems that are naturally defined in terms of smaller versions of themselves (tree traversal, divide-and-conquer algorithms).

```python
# Recursive
def sum_to(n):
    if n == 0:
        return 0
    return n + sum_to(n - 1)

# Iterative — does the same thing, no recursion
def sum_to_iterative(n):
    total = 0
    for i in range(n + 1):
        total += i
    return total
```

## A natural fit for recursion: tree-like structures

```python
def count_files(node):
    if node["type"] == "file":
        return 1
    # it's a folder — sum up all children recursively
    return sum(count_files(child) for child in node["children"])

filesystem = {
    "type": "folder",
    "children": [
        {"type": "file"},
        {
            "type": "folder",
            "children": [{"type": "file"}, {"type": "file"}],
        },
    ],
}

print(count_files(filesystem))  # 3
```

Nested folders are naturally recursive — a folder contains files *and other folders*, so a function that handles "a folder" often needs to call itself on the folders inside it.

## Careful! Python has a recursion limit

Python doesn't optimize "tail calls" the way some other languages do, and enforces a maximum recursion depth (1000 by default) to prevent a runaway recursive function from crashing the interpreter with a stack overflow:

```python
def infinite_recursion(n):
    return infinite_recursion(n + 1)

infinite_recursion(0)
# RecursionError: maximum recursion depth exceeded
```

If you find yourself needing deeper recursion than that, it's usually a sign to either increase the limit with `sys.setrecursionlimit()` (rarely a good idea) or rewrite the logic iteratively.

## Memoization: avoiding repeated work

Naive recursive solutions can repeat the same work many times over. The classic example is a naive Fibonacci implementation:

```python
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(30))  # correct, but very slow — recomputes the same values repeatedly
```

Cache previous results with `functools.lru_cache` (see [functools](/standard-library/functools-module)) to make it fast:

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(100))  # instant, thanks to caching
```

This wraps up the deep dive into functions. Next, we'll cover object-oriented programming — Python's system for bundling data and behavior together.

**Next up:** Chapter 5 — [Classes and Objects →](/oop/classes-and-objects)
