# datetime

The `datetime` module handles dates, times, and the arithmetic between them.

## Getting the current date and time

```python
from datetime import datetime, date

now = datetime.now()
print(now)          # 2026-09-17 14:32:07.123456

today = date.today()
print(today)         # 2026-09-17
```

## Creating a specific date or datetime

```python
from datetime import date, datetime

d = date(2026, 12, 25)
print(d)   # 2026-12-25

dt = datetime(2026, 12, 25, 9, 30, 0)
print(dt)   # 2026-12-25 09:30:00
```

## Accessing components

```python
from datetime import datetime

now = datetime.now()
print(now.year)     # 2026
print(now.month)    # 9
print(now.day)       # 17
print(now.hour)      # 14
print(now.weekday())  # 0-6, Monday is 0
```

## Formatting dates as strings: `strftime`

```python
from datetime import datetime

now = datetime.now()
print(now.strftime("%Y-%m-%d"))            # 2026-09-17
print(now.strftime("%B %d, %Y"))           # September 17, 2026
print(now.strftime("%H:%M:%S"))             # 14:32:07
print(now.strftime("%A, %B %d, %Y"))       # Thursday, September 17, 2026
```

Common format codes:

| Code | Meaning | Example |
|---|---|---|
| `%Y` | 4-digit year | 2026 |
| `%m` | 2-digit month | 09 |
| `%d` | 2-digit day | 17 |
| `%H` | 24-hour clock hour | 14 |
| `%M` | minute | 32 |
| `%S` | second | 07 |
| `%A` | full weekday name | Thursday |
| `%B` | full month name | September |

## Parsing strings into dates: `strptime`

The reverse operation — turning a string into a `datetime` object:

```python
from datetime import datetime

date_string = "2026-12-25"
parsed = datetime.strptime(date_string, "%Y-%m-%d")
print(parsed)   # 2026-12-25 00:00:00
```

::: tip
The format codes must exactly describe the string's layout. Mismatched formats raise a `ValueError` — this is the single most common source of bugs when working with `datetime`.
:::

## ISO format — the recommended interchange format

```python
from datetime import datetime

now = datetime.now()
iso_string = now.isoformat()
print(iso_string)   # 2026-09-17T14:32:07.123456

parsed_back = datetime.fromisoformat(iso_string)
print(parsed_back)
```

ISO 8601 format is unambiguous and widely supported — prefer it over custom formats when storing dates in files or sending them between systems, such as in [JSON](/files-io/json-and-csv).

## Date arithmetic with `timedelta`

```python
from datetime import datetime, timedelta

now = datetime.now()

tomorrow = now + timedelta(days=1)
next_week = now + timedelta(weeks=1)
two_hours_ago = now - timedelta(hours=2)

print(tomorrow)
print(next_week)
print(two_hours_ago)
```

Subtracting two datetimes gives you a `timedelta` representing the difference:

```python
start = datetime(2026, 1, 1)
end = datetime(2026, 12, 31)
difference = end - start

print(difference)             # 364 days, 0:00:00
print(difference.days)        # 364
```

## Comparing dates

```python
from datetime import date

deadline = date(2026, 12, 31)
today = date.today()

if today > deadline:
    print("Deadline has passed")
else:
    print("Still on time")
```

## A note on time zones

Naive `datetime` objects (the ones shown above) carry no timezone information — comparing or combining them with timezone-aware datetimes raises an error. For anything involving multiple time zones, use the standard library's `zoneinfo` module (Python 3.9+):

```python
from datetime import datetime
from zoneinfo import ZoneInfo

ny_time = datetime.now(ZoneInfo("America/New_York"))
london_time = ny_time.astimezone(ZoneInfo("Europe/London"))

print(ny_time)
print(london_time)
```

**Next up:** [collections →](/standard-library/collections-module)
