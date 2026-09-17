# Conditionals

Conditionals let your program make decisions and run different code depending on a condition.

## `if`, `elif`, `else`

```python
age = 20

if age < 13:
    print("Child")
elif age < 20:
    print("Teenager")
else:
    print("Adult")
```

```
Adult
```

- `if` is required.
- `elif` ("else if") is optional, and you can have as many as you need.
- `else` is optional, and always runs if none of the above conditions matched.

Conditions are checked top to bottom; the **first** matching branch runs, and the rest are skipped — even if a later condition would also be true.

## Nesting conditionals

```python
temperature = 15
is_raining = True

if temperature > 20:
    print("Nice and warm")
else:
    if is_raining:
        print("Cold and wet")
    else:
        print("Cold but dry")
```

```
Cold and wet
```

When nesting gets deep, it's often clearer to combine conditions instead:

```python
if temperature <= 20 and is_raining:
    print("Cold and wet")
elif temperature <= 20:
    print("Cold but dry")
else:
    print("Nice and warm")
```

## The ternary (conditional) expression

For simple "if/else that returns a value," Python has a compact one-line form:

```python
age = 15
status = "adult" if age >= 18 else "minor"
print(status)  # minor
```

This reads as: *"`"adult"` if `age >= 18`, otherwise `"minor"`."* Use it for short, simple choices — for anything more complex, a full `if`/`else` block is more readable.

## Truthy and falsy conditions

Any value can be used as a condition, not just explicit `bool`s — see [Data Types](/fundamentals/data-types) for the full list of falsy values:

```python
items = []

if items:
    print(f"You have {len(items)} items")
else:
    print("Your cart is empty")
```

```
Your cart is empty
```

## `match` statements (structural pattern matching)

Python 3.10+ added `match`, similar to a `switch` statement in other languages but considerably more powerful:

```python
def describe(status_code):
    match status_code:
        case 200:
            return "OK"
        case 404:
            return "Not Found"
        case 500 | 502 | 503:
            return "Server Error"
        case _:
            return "Unknown Status"

print(describe(404))  # Not Found
print(describe(502))  # Server Error
print(describe(999))  # Unknown Status
```

`case _:` is the wildcard — it matches anything, like `else`. `match` can also destructure data structures (lists, dicts, objects), which is genuinely useful, but that's an advanced use case beyond what you need starting out.

::: tip When to use `match` vs `if`/`elif`
Reach for `match` when you're comparing one value against several specific possibilities (like a status code or a command name). For general boolean conditions, `if`/`elif`/`else` is still the right tool.
:::

**Next up:** [Loops →](/fundamentals/loops)
