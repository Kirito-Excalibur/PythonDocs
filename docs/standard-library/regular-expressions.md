# Regular Expressions (re)

A regular expression (regex) is a pattern used to match text. Python's `re` module lets you search, extract, and replace text based on these patterns — far more powerful than plain string methods like `.find()` for anything non-trivial.

## When you need regex vs. plain string methods

```python
# Plain string methods are enough for simple, literal checks
if "error" in log_line:
    ...

# Regex is needed for PATTERNS — e.g. "any sequence of digits", not a literal string
import re
if re.search(r"\d{3}-\d{4}", phone_number):
    print("Looks like a phone number")
```

## Basic matching with `re.search` and `re.match`

```python
import re

text = "My phone number is 555-1234"

match = re.search(r"\d{3}-\d{4}", text)
if match:
    print(match.group())   # 555-1234
    print(match.start())    # 20
```

`re.search` looks anywhere in the string; `re.match` only checks the *beginning* of the string:

```python
print(re.match(r"\d+", "123abc"))   # matches, starts at position 0
print(re.match(r"abc", "123abc"))   # None — "abc" isn't at the start
print(re.search(r"abc", "123abc"))  # matches — search looks anywhere
```

## Common pattern building blocks

| Pattern | Meaning |
|---|---|
| `\d` | any digit (0-9) |
| `\w` | any "word" character (letters, digits, underscore) |
| `\s` | any whitespace |
| `.` | any character except newline |
| `*` | zero or more of the previous |
| `+` | one or more of the previous |
| `?` | zero or one of the previous |
| `{3}` | exactly 3 of the previous |
| `{2,4}` | between 2 and 4 of the previous |
| `^` | start of string |
| `$` | end of string |
| `[abc]` | any one of `a`, `b`, or `c` |
| `(...)` | a capturing group |

::: tip
Always use a raw string (`r"..."`) for regex patterns. Without the `r` prefix, Python's own string escaping (`\n`, `\t`, etc.) can interfere with regex escape sequences like `\d` or `\s` before the `re` module ever sees them.
:::

## `re.findall` — get all matches

```python
import re

text = "Contact us at info@example.com or support@example.com"
emails = re.findall(r"\w+@\w+\.\w+", text)
print(emails)   # ['info@example.com', 'support@example.com']
```

## `re.sub` — find and replace

```python
import re

text = "My phone number is 555-1234"
masked = re.sub(r"\d{3}-\d{4}", "XXX-XXXX", text)
print(masked)   # My phone number is XXX-XXXX
```

```python
# Replace multiple whitespace characters with a single space
messy = "This   has    irregular     spacing"
clean = re.sub(r"\s+", " ", messy)
print(clean)   # This has irregular spacing
```

## Capturing groups — extracting parts of a match

Parentheses `()` create a **group**, letting you pull out specific pieces of a match:

```python
import re

text = "Released on 2026-09-17"
match = re.search(r"(\d{4})-(\d{2})-(\d{2})", text)

if match:
    print(match.group(0))   # 2026-09-17  (the whole match)
    print(match.group(1))   # 2026         (first group)
    print(match.group(2))   # 09
    print(match.group(3))   # 17
```

**Named groups** make this more readable for complex patterns:

```python
match = re.search(r"(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})", text)
if match:
    print(match.group("year"))   # 2026
    print(match.groupdict())      # {'year': '2026', 'month': '09', 'day': '17'}
```

## Compiling a pattern for reuse

If you're using the same pattern many times (e.g. inside a loop), compile it once for a small performance improvement and cleaner code:

```python
import re

phone_pattern = re.compile(r"\d{3}-\d{4}")

for line in ["Call 555-1234", "No number here", "Or try 555-5678"]:
    match = phone_pattern.search(line)
    if match:
        print(match.group())
```

## `re.split` — splitting on a pattern

```python
import re

text = "one, two,three  ,four"
parts = re.split(r",\s*", text)
print(parts)   # ['one', 'two', 'three  ', 'four']
```

::: tip
Regex is powerful but can quickly become unreadable. For simple splitting/checking on a fixed literal string, plain `str.split()`, `in`, `.startswith()`, and `.endswith()` are clearer and faster — reach for `re` when you genuinely need pattern matching.
:::

**Next up:** [os and sys →](/standard-library/os-and-sys)
