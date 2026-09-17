# Running Python Code

There are three common ways to run Python code. You'll use all three at different points.

## 1. The interactive interpreter (REPL)

Type `python3` (or `python` on Windows) into your terminal with no arguments:

```bash
$ python3
Python 3.12.4 (main, Jun  6 2024, 18:26:44)
>>>
```

That `>>>` is the **REPL** — Read, Evaluate, Print, Loop. Type an expression, hit Enter, and it runs immediately:

```
>>> 2 + 2
4
>>> "hello".upper()
'HELLO'
>>> name = "Ada"
>>> print(f"Hi, {name}")
Hi, Ada
```

The REPL is perfect for quickly testing an idea — checking how a function behaves, or what an expression evaluates to. It's *not* meant for writing real programs, since nothing you type is saved to a file. Exit it with `exit()` or `Ctrl+D` (`Ctrl+Z` then Enter on Windows).

## 2. Running a script file

For anything beyond a one-liner, write code into a `.py` file and run the whole file at once.

Create a file called `hello.py`:

```python
# hello.py
print("Hello from a script!")
```

Then run it from the terminal:

```bash
python3 hello.py
```

```
Hello from a script!
```

This is how you'll run almost everything in this tutorial: save a `.py` file, run it, look at the output, tweak, repeat.

## 3. Jupyter notebooks

Popular in data science, a **Jupyter notebook** lets you mix code, output, and formatted text in one interactive document, split into cells you can run independently. It's outside the scope of this tutorial, but worth knowing the name — you'll see `.ipynb` files referenced often in data-related Python material.

## Choosing between them

| Method | Best for |
|---|---|
| REPL | Quick experiments, checking syntax, exploring an object |
| Script file | Real programs, anything you want to save and re-run |
| Jupyter notebook | Data exploration, mixing narrative with code |

::: tip Follow along
As you go through this tutorial, we'd recommend keeping a terminal with the REPL open in one window and an editor in another. Try small snippets in the REPL; build up full examples as script files.
:::

**Next up:** [Your First Program →](/getting-started/first-steps)
