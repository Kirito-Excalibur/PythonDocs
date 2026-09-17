# Logging

`print()` is fine for quick debugging, but real applications need something more structured: the ability to turn messages on/off by severity, include timestamps automatically, and send output to a file instead of (or in addition to) the terminal. That's what the standard library's `logging` module provides.

## Basic usage

```python
import logging

logging.basicConfig(level=logging.INFO)

logging.debug("This is a debug message")     # won't show — below INFO level
logging.info("Application started")
logging.warning("Disk space is low")
logging.error("Failed to connect to database")
logging.critical("System is shutting down")
```

```
INFO:root:Application started
WARNING:root:Disk space is low
ERROR:root:Failed to connect to database
CRITICAL:root:System is shutting down
```

## The five log levels

| Level | Numeric value | When to use |
|---|---|---|
| `DEBUG` | 10 | Detailed diagnostic info, useful only while developing |
| `INFO` | 20 | Confirmation that things are working as expected |
| `WARNING` | 30 | Something unexpected happened, but the program can continue |
| `ERROR` | 40 | A serious problem — some functionality failed |
| `CRITICAL` | 50 | The program itself may be unable to continue |

Setting `level=logging.INFO` means only messages at `INFO` or **higher** severity are shown — `DEBUG` messages are suppressed. This is the key advantage over `print()`: you can dial the verbosity up or down in one place, without touching any of the actual log calls scattered throughout your code.

## Why not just use `print()`?

```python
# With print — always on, no way to filter, no context
print("Processing item", item_id)

# With logging — filterable, timestamped, and identifies the source module
logging.info("Processing item %s", item_id)
```

::: tip
Notice `%s` instead of an f-string. Passing arguments this way means the string formatting only happens if the message actually gets logged (i.e., if its level is enabled) — a small performance benefit when `DEBUG` logging is disabled in production but the calls remain in the code.
:::

## Creating a named logger (the recommended pattern)

Rather than calling `logging.info(...)` directly (which uses a shared "root" logger), create a logger scoped to your module — this is the standard, idiomatic pattern:

```python
import logging

logger = logging.getLogger(__name__)

def process_order(order_id):
    logger.info("Processing order %s", order_id)
    try:
        # ... do work ...
        logger.info("Order %s completed", order_id)
    except Exception:
        logger.exception("Order %s failed", order_id)   # includes the traceback automatically
```

Using `__name__` (the module's own name) means log output tells you exactly *which module* produced each message — invaluable in a larger application with many files.

## Configuring format and output

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    filename="app.log",   # write to a file instead of the console
)

logger = logging.getLogger(__name__)
logger.info("Application started")
```

`app.log` then contains:

```
2026-09-17 14:32:07,123 - __main__ - INFO - Application started
```

## `logger.exception()` — logging inside an `except` block

```python
import logging

logger = logging.getLogger(__name__)

try:
    result = 10 / 0
except ZeroDivisionError:
    logger.exception("Division failed")
```

```
ERROR:__main__:Division failed
Traceback (most recent call last):
  File "script.py", line 5, in <module>
    result = 10 / 0
ZeroDivisionError: division by zero
```

`logger.exception()` automatically includes the full traceback — call it only from inside an `except` block (see [try / except / finally](/error-handling/try-except-finally)); outside one, it has no exception to attach.

## Where to go from here

You've now covered Python from your first `print("Hello, World!")` through decorators, generators, async programming, and metaclasses. The best way to solidify all of this is to build something — a small CLI tool, a script that automates something tedious in your own life, or a simple web API. Revisit any chapter here as a reference whenever you need a refresher; that's exactly what it's for.

Happy coding!
