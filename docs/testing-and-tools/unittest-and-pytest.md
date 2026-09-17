# unittest & pytest

Automated tests check that your code behaves correctly — automatically, repeatedly, and without you manually re-verifying by hand every time you make a change.

## Why write tests?

```python
def add(a, b):
    return a + b
```

Without a test, you verify this works by running it manually once and moving on. Weeks later, someone refactors `add` and introduces a subtle bug — nobody notices until it causes a problem in production. A test catches this the instant it happens, every single time the test suite runs.

## `unittest` — built into the standard library

```python
# calculator.py
def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

```python
# test_calculator.py
import unittest
from calculator import add, divide

class TestCalculator(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)

    def test_divide(self):
        self.assertEqual(divide(10, 2), 5)

    def test_divide_by_zero_raises(self):
        with self.assertRaises(ValueError):
            divide(10, 0)

if __name__ == "__main__":
    unittest.main()
```

```bash
python3 -m unittest test_calculator.py
```

```
...
----------------------------------------------------------------------
Ran 3 tests in 0.001s

OK
```

Each method starting with `test_` is run as an independent test. Common assertion methods: `assertEqual`, `assertTrue`, `assertFalse`, `assertIsNone`, `assertRaises`, `assertIn`.

## `pytest` — the popular third-party alternative

```bash
pip install pytest
```

The same tests, written for `pytest`, are noticeably less verbose — plain `assert` statements instead of special methods, and no class required:

```python
# test_calculator.py
import pytest
from calculator import add, divide

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0

def test_divide():
    assert divide(10, 2) == 5

def test_divide_by_zero_raises():
    with pytest.raises(ValueError):
        divide(10, 0)
```

```bash
pytest test_calculator.py
```

```
====================== test session starts ======================
collected 3 items

test_calculator.py ...                                     [100%]

======================= 3 passed in 0.01s ========================
```

`pytest` also gives much more informative failure output automatically — when a plain `assert x == y` fails, it shows you exactly what `x` and `y` actually were, without needing a special `assertEqual` method.

::: tip
Both work fine, but `pytest` has become the de facto standard for new Python projects, thanks to its simpler syntax, better failure messages, and a large plugin ecosystem. `unittest` remains valuable to know since it's in the standard library and used throughout many existing codebases.
:::

## Fixtures — reusable setup for tests

When multiple tests need the same setup, `pytest` fixtures avoid repeating it:

```python
import pytest

@pytest.fixture
def sample_data():
    return {"name": "Ada", "age": 36}

def test_name(sample_data):
    assert sample_data["name"] == "Ada"

def test_age(sample_data):
    assert sample_data["age"] == 36
```

Each test that declares `sample_data` as a parameter automatically receives a fresh copy — `pytest` matches the parameter name to the fixture function.

## Parametrized tests — one test, many inputs

```python
import pytest
from calculator import add

@pytest.mark.parametrize("a, b, expected", [
    (2, 3, 5),
    (-1, 1, 0),
    (0, 0, 0),
    (100, 200, 300),
])
def test_add_various(a, b, expected):
    assert add(a, b) == expected
```

This runs the same test body four times with different inputs, reported as four separate results — much less repetitive than writing four near-identical test functions.

## What makes a good test

- **One thing per test.** `test_divide_by_zero_raises` checks exactly one behavior — easy to understand when it fails.
- **Independent tests.** Tests shouldn't depend on each other running in a particular order.
- **Fast.** A slow test suite discourages running it often — mock out slow operations like network calls where practical.
- **Deterministic.** The same test should always produce the same result — avoid depending on the current time, random values (without a fixed seed), or external services.

**Next up:** [Logging →](/testing-and-tools/logging)
