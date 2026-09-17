# Nested Data Structures

Real-world data is rarely flat. Python's collections can freely contain other collections — a list of dicts, a dict of lists, and so on — which is exactly how you model structured data like JSON.

## A list of dictionaries

The most common shape for "a table of records":

```python
users = [
    {"name": "Ada", "age": 36, "role": "admin"},
    {"name": "Alan", "age": 41, "role": "editor"},
    {"name": "Grace", "age": 85, "role": "admin"},
]

for user in users:
    print(f"{user['name']} ({user['role']})")
```

```
Ada (admin)
Alan (editor)
Grace (admin)
```

Filtering with a comprehension (see [Comprehensions](/data-structures/comprehensions)):

```python
admins = [user["name"] for user in users if user["role"] == "admin"]
print(admins)  # ['Ada', 'Grace']
```

## A dictionary of lists

```python
courses = {
    "Ada": ["Math", "Physics"],
    "Alan": ["Computer Science"],
}

courses["Ada"].append("Chemistry")
print(courses)
# {'Ada': ['Math', 'Physics', 'Chemistry'], 'Alan': ['Computer Science']}
```

## Deeply nested structures

```python
company = {
    "name": "Acme Corp",
    "departments": [
        {
            "name": "Engineering",
            "employees": [
                {"name": "Ada", "title": "Senior Engineer"},
                {"name": "Alan", "title": "Engineer"},
            ],
        },
        {
            "name": "Sales",
            "employees": [
                {"name": "Grace", "title": "Sales Lead"},
            ],
        },
    ],
}

for department in company["departments"]:
    print(department["name"])
    for employee in department["employees"]:
        print(f"  - {employee['name']} ({employee['title']})")
```

```
Engineering
  - Ada (Senior Engineer)
  - Alan (Engineer)
Sales
  - Grace (Sales Lead)
```

This is exactly the shape you'll get back from many real APIs after parsing JSON — see [JSON and CSV](/files-io/json-and-csv).

## Accessing nested data safely

Chained `[]` access raises an error the moment any key is missing. Use `.get()` with a default at each level when a key might not exist:

```python
config = {"database": {"host": "localhost"}}

# Risky — raises KeyError if "port" is missing
# port = config["database"]["port"]

# Safer
port = config.get("database", {}).get("port", 5432)
print(port)  # 5432
```

## Modifying nested structures in place

Remember: nested lists/dicts are still mutable objects, reached by reference:

```python
data = {"tags": ["python", "tutorial"]}

def add_tag(data, tag):
    data["tags"].append(tag)   # mutates the SAME list the caller has

add_tag(data, "beginner")
print(data)  # {'tags': ['python', 'tutorial', 'beginner']}
```

If you need an independent copy before mutating, use `copy.deepcopy()` (see [Lists](/data-structures/lists)):

```python
import copy

original = {"tags": ["python"]}
backup = copy.deepcopy(original)
original["tags"].append("new")
print(backup)  # {'tags': ['python']} — untouched
```

## Building nested structures with comprehensions

```python
grid = [[row * 3 + col for col in range(3)] for row in range(3)]
print(grid)
# [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
```

::: warning Careful! Don't multiply a mutable list to build a "grid"
```python
grid = [[0] * 3] * 3   # looks reasonable, is NOT what you want
grid[0][0] = 1
print(grid)  # [[1, 0, 0], [1, 0, 0], [1, 0, 0]] — all rows changed!
```
`[[0] * 3] * 3` creates **one** inner list and repeats the *same reference* three times. Use a comprehension instead, which creates three genuinely separate lists:
```python
grid = [[0] * 3 for _ in range(3)]
grid[0][0] = 1
print(grid)  # [[1, 0, 0], [0, 0, 0], [0, 0, 0]] — correct
```
:::

This wraps up Python's core data structures. Next, we'll go deeper into functions — closures, decorators, iterators, and generators.

**Next up:** Chapter 4 — [*args and **kwargs →](/functions-deep-dive/args-kwargs)
