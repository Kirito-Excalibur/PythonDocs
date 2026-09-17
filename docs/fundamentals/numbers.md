# Numbers

Python has three built-in numeric types: `int`, `float`, and `complex`. You'll use `int` and `float` constantly; `complex` is niche (mostly scientific computing).

## Integers (`int`)

Whole numbers, positive or negative, with **no size limit** beyond available memory:

```python
small = 42
negative = -17
huge = 123456789012345678901234567890
print(huge * 2)  # 246913578024691357802469135780
```

::: tip
Unlike languages such as Java or C, Python integers never silently overflow. `10 ** 100` just works, no special "big number" type required.
:::

You can use underscores to make large numbers more readable — they're ignored by the interpreter:

```python
population = 1_000_000_000
print(population)  # 1000000000
```

## Floating-point numbers (`float`)

Numbers with a decimal point, using standard IEEE 754 double-precision:

```python
pi = 3.14159
temperature = -4.5
scientific = 2.5e3   # 2500.0 (scientific notation)
```

::: warning Careful! Floats are not perfectly precise
```python
print(0.1 + 0.2)  # 0.30000000000000004
```
This isn't a Python bug — it's how binary floating-point works in every mainstream language. Never compare floats with `==` directly; instead check they're "close enough":
```python
result = 0.1 + 0.2
print(abs(result - 0.3) < 1e-9)  # True
```
For money or anything requiring exact decimal precision, use the `decimal` module instead of `float`.
:::

## Arithmetic operators

```python
a, b = 17, 5

print(a + b)   # 22   addition
print(a - b)   # 12   subtraction
print(a * b)   # 85   multiplication
print(a / b)   # 3.4  division — ALWAYS returns a float
print(a // b)  # 3    floor division — rounds down to an int
print(a % b)   # 2    modulo — the remainder
print(a ** b)  # 1419857  exponentiation
```

::: warning Careful! `/` vs `//`
`/` is "true division" and always returns a `float`, even if the numbers divide evenly:
```python
print(10 / 2)   # 5.0, not 5
```
Use `//` when you specifically want integer (floor) division.
:::

## Converting between numeric types

```python
print(int(3.99))     # 3    truncates toward zero, doesn't round
print(int(-3.99))    # -3
print(float(7))       # 7.0
print(round(3.14159, 2))  # 3.14
```

`round()` uses **banker's rounding** (rounds to the nearest even number on a tie), which can surprise people:

```python
print(round(0.5))   # 0
print(round(1.5))   # 2
print(round(2.5))   # 2
```

## Useful built-in functions

```python
print(abs(-7))          # 7      absolute value
print(min(4, 9, 1))     # 1
print(max(4, 9, 1))     # 9
print(sum([1, 2, 3]))   # 6
print(pow(2, 10))       # 1024   same as 2 ** 10
```

## The `math` module

For anything beyond basic arithmetic, reach for the standard library's `math` module:

```python
import math

print(math.sqrt(16))     # 4.0
print(math.floor(4.7))   # 4
print(math.ceil(4.3))    # 5
print(math.pi)            # 3.141592653589793
```

(We cover `import` properly in [Modules](/modules-packages/modules).)

**Next up:** [Strings →](/fundamentals/strings)
