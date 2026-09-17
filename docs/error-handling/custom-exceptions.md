# Custom Exceptions

Sometimes the built-in exception types (`ValueError`, `TypeError`, etc.) don't precisely describe what went wrong in *your* program's domain. You can define your own exception types by subclassing `Exception`.

## Defining a custom exception

```python
class InsufficientFundsError(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(f"Cannot withdraw {amount}, balance is only {balance}")
    return balance - amount

withdraw(100, 500)
```

```
Traceback (most recent call last):
  ...
InsufficientFundsError: Cannot withdraw 500, balance is only 100
```

That's the entire definition — `pass` is all the body needs, since it inherits everything useful (message storage, string formatting, etc.) from `Exception`.

## Why bother with a custom type?

**1. Callers can catch precisely what they expect**, instead of a generic `ValueError` that might mean several different things across a large codebase:

```python
try:
    withdraw(100, 500)
except InsufficientFundsError as e:
    print(f"Transaction failed: {e}")
```

**2. It self-documents your code's failure modes.** Seeing `raise InvalidUsernameError(...)` in a function tells you immediately what can go wrong, without reading the whole function body.

**3. You can build an exception hierarchy** specific to your application:

```python
class ApplicationError(Exception):
    """Base class for all errors raised by this application."""

class InsufficientFundsError(ApplicationError):
    pass

class AccountFrozenError(ApplicationError):
    pass

class InvalidAmountError(ApplicationError):
    pass
```

Now calling code can catch broadly or narrowly, as needed:

```python
try:
    withdraw(account, amount)
except InsufficientFundsError:
    print("Not enough money")
except AccountFrozenError:
    print("This account is frozen")
except ApplicationError:
    print("Some other application error occurred")
```

## Adding extra data to a custom exception

Override `__init__` to attach useful context beyond just a message:

```python
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        message = f"Cannot withdraw {amount}: balance is only {balance}"
        super().__init__(message)

try:
    raise InsufficientFundsError(balance=100, amount=500)
except InsufficientFundsError as e:
    print(e)              # Cannot withdraw 500: balance is only 100
    print(e.balance)       # 100
    print(e.amount)        # 500
```

The caller can now programmatically inspect exactly *how much* was short, not just read a formatted message.

## Chaining exceptions with `raise ... from`

When you catch one exception and raise a different, more meaningful one in response, use `raise ... from` to preserve the original cause in the traceback:

```python
class ConfigError(Exception):
    pass

def load_config(path):
    try:
        with open(path) as f:
            return f.read()
    except FileNotFoundError as e:
        raise ConfigError(f"Could not load config from {path}") from e

load_config("settings.ini")
```

```
Traceback (most recent call last):
  ...
FileNotFoundError: [Errno 2] No such file or directory: 'settings.ini'

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  ...
ConfigError: Could not load config from settings.ini
```

This gives whoever reads the traceback the full story — *why* the `ConfigError` happened — instead of losing the original `FileNotFoundError` entirely.

**Next up:** [Context Managers →](/error-handling/context-managers)
