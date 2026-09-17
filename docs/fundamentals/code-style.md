# Code Style (PEP 8)

**PEP 8** is Python's official style guide. Following it means your code looks familiar to any other Python developer — which matters a lot, since code is read far more often than it's written.

## Naming conventions

| What | Convention | Example |
|---|---|---|
| Variables, functions | `snake_case` | `user_name`, `calculate_total()` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_RETRIES = 3` |
| Classes | `PascalCase` | `class UserAccount:` |
| "Private" attributes | leading underscore | `_internal_value` |
| Modules, packages | short, lowercase | `utils.py`, `mypackage/` |

## Indentation and line length

- Use **4 spaces** per indentation level. Never tabs.
- Keep lines to **79 characters** or fewer (many teams relax this to 99 or 100 — check your project's config, but be consistent).

```python
# Good
def calculate_total(price, tax_rate, discount=0):
    return price * (1 + tax_rate) - discount


# Avoid — inconsistent spacing, unclear names
def calc(p,t,d=0):
	return p*(1+t)-d
```

## Whitespace

```python
# Good
x = 1
y = 2
total = x + y
values = [1, 2, 3]
result = my_function(a, b, c=10)

# Avoid
x=1
y = 2
total=x+y
values = [ 1,2,3 ]
result = my_function (a,b,c = 10)
```

Rules of thumb:

- One space around `=` in assignments, but no spaces around `=` for keyword arguments (`c=10`, not `c = 10`).
- One space after commas.
- No space right inside brackets/parentheses.
- Two blank lines between top-level function/class definitions; one blank line between methods inside a class.

## Imports

```python
# Good — one import per line, standard library first
import os
import sys

from collections import defaultdict

import requests

from myapp.models import User
```

Avoid wildcard imports — they make it unclear where a name came from:

```python
from module import *   # avoid
```

## Comments

```python
# Good — explains WHY, not WHAT
# Using a set here since order doesn't matter and lookups are O(1)
seen = set()

# Avoid — states the obvious
x = x + 1  # add 1 to x
```

## Comparing to `None`, `True`, `False`

```python
# Good
if value is None:
    ...
if is_ready:
    ...
if not is_ready:
    ...

# Avoid
if value == None:
    ...
if is_ready == True:
    ...
```

## Tools that check this for you

You don't need to memorize every rule — automated tools handle it:

- **[ruff](https://docs.astral.sh/ruff/)** — extremely fast linter and formatter; the modern default choice for most new projects.
- **[black](https://black.readthedocs.io/)** — an opinionated auto-formatter ("uncompromising," by its own description) that reformats your code to a consistent style automatically.
- **[flake8](https://flake8.pycqa.org/)** — an older, still widely used linter.

A typical setup runs one of these automatically before every commit. Install and try one:

```bash
pip install ruff
ruff check .        # find issues
ruff format .        # auto-format your code
```

::: tip
Don't stress over perfect PEP 8 compliance while learning — focus on writing correct, working code first. Run a formatter like `ruff format` or `black` on your files afterward, and let the tool handle the nitpicky spacing rules for you.
:::

This wraps up Python fundamentals. Next, we'll look at Python's core built-in data structures in depth.

**Next up:** Chapter 3 — [Lists →](/data-structures/lists)
