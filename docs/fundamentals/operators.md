# Operators

## Arithmetic operators

Covered in detail in [Numbers](/fundamentals/numbers):

```python
+   -   *   /   //   %   **
```

## Comparison operators

Return a `bool`:

```python
print(5 == 5)   # True   equal to
print(5 != 3)   # True   not equal to
print(5 > 3)    # True   greater than
print(5 < 3)    # False  less than
print(5 >= 5)   # True   greater than or equal to
print(5 <= 4)   # False  less than or equal to
```

::: warning Careful! `==` vs `=`
`=` assigns a value. `==` compares two values. Mixing these up (`if x = 5:`) is a syntax error in Python, unlike some languages where it silently does the wrong thing — so Python actually protects you here.
:::

Comparisons can be chained, which reads naturally:

```python
x = 5
print(0 < x < 10)   # True — equivalent to (0 < x) and (x < 10)
```

## Logical operators

Python spells these out as words, not symbols:

```python
print(True and False)   # False
print(True or False)    # True
print(not True)         # False
```

```python
age = 25
has_license = True

if age >= 18 and has_license:
    print("Can drive")
```

`and` / `or` **short-circuit** and return one of their actual operands, not necessarily `True`/`False` — a common and useful idiom:

```python
name = ""
display_name = name or "Anonymous"
print(display_name)   # Anonymous (since "" is falsy)

result = 0 and (1 / 0)  # right side never evaluated — no ZeroDivisionError
print(result)            # 0
```

## Assignment operators

```python
x = 10
x += 5    # same as x = x + 5   -> 15
x -= 3    # x = x - 3           -> 12
x *= 2    # x = x * 2           -> 24
x /= 4    # x = x / 4           -> 6.0
x //= 2   # x = x // 2          -> 3.0
x **= 2   # x = x ** 2          -> 9.0
x %= 4    # x = x % 4           -> 1.0
```

::: tip
There's no `++` or `--` in Python. Use `x += 1` and `x -= 1` instead.
:::

## Identity operators: `is` and `is not`

`is` checks whether two names refer to the **exact same object** in memory — not just equal values:

```python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)   # True  — same contents
print(a is b)   # False — different objects in memory
print(a is c)   # True  — c is literally the same object as a
```

Use `is` for singleton checks — most commonly `is None`:

```python
value = None
if value is None:
    print("No value provided")
```

## Membership operators: `in` and `not in`

```python
fruits = ["apple", "banana", "cherry"]

print("banana" in fruits)       # True
print("mango" not in fruits)    # True
print("a" in "banana")          # True — works on strings too
print("key" in {"key": "value"})  # True — checks dict keys
```

## Bitwise operators

Less common day-to-day, but useful for flags, masks, and low-level work:

```python
a, b = 12, 10   # binary: 1100, 1010

print(a & b)    # 8    AND
print(a | b)    # 14   OR
print(a ^ b)    # 6    XOR
print(~a)       # -13  NOT
print(a << 2)   # 48   left shift
print(a >> 2)   # 3    right shift
```

## Operator precedence

When operators mix, Python follows a defined order (highest to lowest, abbreviated):

```
**                      exponentiation
+x  -x  ~x              unary plus/minus, bitwise not
*  /  //  %             multiplication, division
+  -                    addition, subtraction
<  <=  >  >=  !=  ==    comparisons
not
and
or
```

When in doubt, use parentheses — they cost nothing and remove ambiguity:

```python
result = (2 + 3) * 4   # 20, explicit and clear
```

**Next up:** [User Input & Output →](/fundamentals/input-output)
