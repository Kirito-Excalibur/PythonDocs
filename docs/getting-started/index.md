# Introduction to Python

Python is a general-purpose programming language created by **Guido van Rossum** and first released in 1991. It's used for web development, data science, automation, scripting, machine learning, and just about everything in between.

People love Python for a few reasons:

- **Readable syntax.** Python code often reads like plain English. There are no curly braces or semicolons to manage — structure comes from indentation.
- **Batteries included.** The standard library ships with tools for working with files, dates, networking, math, and much more, so you rarely need a third-party package just to get started.
- **Huge ecosystem.** Need to build a website, train a neural network, or automate a spreadsheet? There's almost certainly a mature, well-documented library for it.
- **One language, many uses.** The same language that scripts a build pipeline can also power a web API or a data pipeline.

## What does Python code look like?

Here's a complete, working Python program:

```python
def greet(name):
    return f"Hello, {name}!"

for person in ["Ada", "Grace", "Alan"]:
    print(greet(person))
```

```
Hello, Ada!
Hello, Grace!
Hello, Alan!
```

Notice a few things even before you know any Python:

- There's no `main()` function required — code at the top level just runs.
- Blocks (like the body of the `for` loop) are defined by **indentation**, not `{ }`.
- No semicolons at the end of lines.
- `f"Hello, {name}!"` is an *f-string* — a way to embed variables directly inside text.

Don't worry about understanding all of this yet — every piece is covered in the chapters ahead.

## Python 2 vs Python 3

You may still see references to "Python 2" online. **Python 2 reached end of life in January 2020** and is no longer maintained. This tutorial — and virtually the entire modern Python ecosystem — uses **Python 3**. If you're installing Python today, you're installing Python 3.

## Is Python a compiled or interpreted language?

Python is typically described as *interpreted*: you run your `.py` source file directly, and the Python interpreter reads and executes it line by line (technically, it first compiles to an intermediate bytecode, then runs that bytecode on a virtual machine — but you don't need to manage this step yourself).

This is different from languages like C or Rust, where you compile source code into a standalone executable *before* running it. The practical effect for you: there's no separate "build" step. You write code, and you run it.

## What you'll learn in this tutorial

This tutorial is organized into twelve chapters, roughly in the order you should read them:

1. **Getting Started** — installing Python and running your first program.
2. **Fundamentals** — variables, data types, operators, conditionals, loops, and functions.
3. **Data Structures** — lists, tuples, dictionaries, sets, and comprehensions.
4. **Functions In-Depth** — closures, decorators, iterators, and generators.
5. **Object-Oriented Programming** — classes, inheritance, and magic methods.
6. **Error Handling** — exceptions and context managers.
7. **Modules & Packages** — organizing code and managing dependencies.
8. **Files & I/O** — reading and writing files, JSON, and CSV.
9. **Standard Library Tour** — the most useful built-in modules.
10. **Concurrency** — threads, processes, and `asyncio`.
11. **Advanced Topics** — type hints, dataclasses, descriptors, and metaclasses.
12. **Testing & Tools** — debugging and writing tests.

Let's get Python installed on your machine and write some code.

**Next up:** [Installing Python →](/getting-started/installation)
