# JSON and CSV

Two of the most common data interchange formats you'll encounter — configuration files, API responses, spreadsheet exports — are JSON and CSV. Both have first-class support in the standard library.

## JSON

JSON (JavaScript Object Notation) maps naturally onto Python's dicts and lists, which is exactly why it's so widely used as a data format.

### Parsing JSON

```python
import json

json_string = '{"name": "Ada", "age": 36, "skills": ["Python", "Math"]}'
data = json.loads(json_string)   # "loads" = load from a STRING

print(data["name"])     # Ada
print(data["skills"])   # ['Python', 'Math']
print(type(data))       # <class 'dict'>
```

### Converting Python data to a JSON string

```python
import json

data = {"name": "Ada", "age": 36, "skills": ["Python", "Math"]}
json_string = json.dumps(data)   # "dumps" = dump to a STRING
print(json_string)
# {"name": "Ada", "age": 36, "skills": ["Python", "Math"]}

pretty = json.dumps(data, indent=2)
print(pretty)
```

```
{
  "name": "Ada",
  "age": 36,
  "skills": [
    "Python",
    "Math"
  ]
}
```

### Reading and writing JSON files

```python
import json

# Reading
with open("data.json") as f:
    data = json.load(f)     # note: "load", not "loads" — reads from a FILE object

# Writing
with open("output.json", "w") as f:
    json.dump(data, f, indent=2)   # note: "dump", not "dumps" — writes to a FILE object
```

::: tip Remember the naming pattern
`loads`/`dumps` work with **strings** ("s" for string). `load`/`dump` work with **file objects** directly. Mixing these up is a very common early mistake.
:::

### Type mapping between JSON and Python

| JSON | Python |
|---|---|
| object | `dict` |
| array | `list` |
| string | `str` |
| number | `int` or `float` |
| `true` / `false` | `True` / `False` |
| `null` | `None` |

### Handling malformed JSON

```python
import json

try:
    data = json.loads("{invalid json}")
except json.JSONDecodeError as e:
    print(f"Failed to parse JSON: {e}")
```

## CSV

CSV (Comma-Separated Values) is the standard format for simple tabular data, commonly exported from spreadsheets.

### Reading a CSV file

```python
import csv

with open("people.csv") as f:
    reader = csv.reader(f)
    header = next(reader)          # grab the first row separately
    for row in reader:
        print(row)                  # each row is a plain list of strings
```

Given `people.csv`:

```
name,age,city
Ada,36,London
Alan,41,Manchester
```

Output:

```
['Ada', '36', 'London']
['Alan', '41', 'Manchester']
```

### Reading as dictionaries (usually more convenient)

```python
import csv

with open("people.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])
```

```
Ada 36
Alan 41
```

`DictReader` automatically uses the first row as column names, giving you dicts keyed by column instead of plain positional lists.

### Writing a CSV file

```python
import csv

rows = [
    ["name", "age", "city"],
    ["Ada", 36, "London"],
    ["Alan", 41, "Manchester"],
]

with open("output.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(rows)
```

::: warning Careful! Always pass `newline=""` when writing CSV
Without it, Windows can insert extra blank lines between rows due to how newlines are translated. This is a well-known CSV-specific gotcha called out directly in Python's own documentation.
:::

### Writing from dictionaries

```python
import csv

people = [
    {"name": "Ada", "age": 36, "city": "London"},
    {"name": "Alan", "age": 41, "city": "Manchester"},
]

with open("output.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "age", "city"])
    writer.writeheader()
    writer.writerows(people)
```

::: tip For serious data work, consider `pandas`
For anything beyond simple reading/writing — filtering, aggregating, joining, reshaping — the third-party `pandas` library is the standard tool for tabular data in the Python ecosystem, though it's outside the scope of this tutorial's standard-library focus.
:::

This wraps up files and I/O. Next, we'll take a tour of the most useful modules in Python's standard library.

**Next up:** Chapter 9 — [datetime →](/standard-library/datetime)
