# Type Hints

Type hints let you annotate variables, parameters, and return values with their expected types. Unlike statically typed languages, **Python never enforces these at runtime** — they exist for readability, and to let external tools catch mistakes before your code even runs.

## Basic syntax

```python
def greet(name: str) -> int:
    print(f"Hello, {name}")
    return len(name)

age: int = 30
price: float = 19.99
is_active: bool = True
```

`name: str` means "`name` is expected to be a `str`." `-> int` means "this function is expected to return an `int`." Nothing about this changes how the code actually runs:

```python
def greet(name: str) -> int:
    return name   # returns a str, contradicting "-> int" — runs FINE, no error!

print(greet("Ada"))   # "Ada" — Python itself never checks the hint
```

## Why bother, if they're not enforced?

1. **Editor support** — autocomplete, inline errors, and "go to definition" all become dramatically better with type hints in place.
2. **Static type checkers** — tools like `mypy` or `pyright` scan your code *without running it* and catch type mismatches as errors:

```bash
pip install mypy
mypy my_script.py
```

```
my_script.py:2: error: Argument "name" has incompatible type "int"; expected "str"
```

3. **Documentation** — a hinted function signature tells you what to pass without reading the implementation.

## Collection types

```python
from typing import List, Dict, Tuple, Set, Optional

names: List[str] = ["Ada", "Alan"]
scores: Dict[str, int] = {"Ada": 95, "Alan": 88}
point: Tuple[int, int] = (3, 4)
unique_ids: Set[int] = {1, 2, 3}
```

::: tip Python 3.9+ simplification
Since Python 3.9, you can use the built-in types directly, without importing from `typing`:
```python
names: list[str] = ["Ada", "Alan"]
scores: dict[str, int] = {"Ada": 95, "Alan": 88}
point: tuple[int, int] = (3, 4)
```
Prefer this modern style for any code targeting Python 3.9+.
:::

## `Optional` — a value that might be `None`

```python
from typing import Optional

def find_user(user_id: int) -> Optional[str]:
    users = {1: "Ada", 2: "Alan"}
    return users.get(user_id)   # returns None if not found

# Python 3.10+ equivalent, using the | (union) syntax:
def find_user(user_id: int) -> str | None:
    ...
```

`Optional[str]` is shorthand for `str | None` — "either a `str`, or `None`."

## Union types — more than one possible type

```python
def process(value: int | str) -> str:
    return str(value)
```

(Prior to Python 3.10, this required `Union[int, str]` from `typing`.)

## Type hints for functions and callables

```python
from typing import Callable

def apply_twice(func: Callable[[int], int], value: int) -> int:
    return func(func(value))

def add_one(n: int) -> int:
    return n + 1

print(apply_twice(add_one, 5))  # 7
```

`Callable[[int], int]` means "a function that takes one `int` and returns an `int`."

## Type aliases — naming a complex type

```python
from typing import Dict, List

UserId = int
UserDatabase = Dict[UserId, List[str]]

def get_roles(db: UserDatabase, user_id: UserId) -> List[str]:
    return db.get(user_id, [])
```

## Generic classes with `TypeVar`

For a container-like class that should work with any type consistently:

```python
from typing import TypeVar, Generic

T = TypeVar("T")

class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

int_stack: Stack[int] = Stack()
int_stack.push(5)
```

## Should you always add type hints?

::: tip
Type hints pay off the most in larger codebases, shared libraries, and anywhere multiple people collaborate — they act as always-up-to-date documentation checked by a tool, rather than a comment that can silently go stale. For quick scripts and one-off exploration, they're optional overhead you can skip.
:::

**Next up:** [Dataclasses →](/advanced/dataclasses)
