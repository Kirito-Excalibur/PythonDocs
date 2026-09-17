# Strings

A string (`str`) is a sequence of characters, used for any kind of text.

## Creating strings

```python
single = 'hello'
double = "hello"
triple = """this can
span multiple
lines"""
```

Single and double quotes work identically — pick one and be consistent. Use whichever lets you avoid escaping:

```python
quote = "It's a nice day"          # easier than 'It\'s a nice day'
speech = 'She said "hi" to me'     # easier than "She said \"hi\" to me"
```

Triple-quoted strings (`"""..."""` or `'''...'''`) can span multiple lines and are also used for docstrings (see [Functions](/fundamentals/functions)).

## String concatenation and repetition

```python
first = "Py"
second = "thon"
print(first + second)   # Python
print(first * 3)        # PyPyPy
```

## f-strings — the modern way to build strings

An **f-string** (formatted string literal) lets you embed expressions directly inside a string, prefixed with `f`:

```python
name = "Ada"
age = 36

print(f"{name} is {age} years old")
# Ada is 36 years old

print(f"Next year she'll be {age + 1}")
# Next year she'll be 37
```

You can call methods and format numbers right inside the braces:

```python
price = 19.999
print(f"Total: ${price:.2f}")   # Total: $19.00... wait, rounds: Total: $20.00
```

```python
pi = 3.14159265
print(f"{pi:.2f}")   # 3.14
print(f"{1000000:,}")  # 1,000,000
```

::: tip
f-strings (Python 3.6+) are the recommended way to format strings in modern Python. You may still see the older `str.format()` method and `%`-formatting in existing code — they still work, but prefer f-strings for anything new.
:::

## Indexing and slicing

Strings are sequences, so individual characters are accessed by position (starting at `0`):

```python
word = "Python"

print(word[0])    # P
print(word[-1])   # n   (negative index counts from the end)

print(word[0:3])  # Pyt   (slice: index 0 up to, but not including, 3)
print(word[:3])   # Pyt   (start defaults to 0)
print(word[3:])   # hon   (end defaults to the end of the string)
print(word[::-1]) # nohtyP  (step of -1 reverses the string)
```

::: warning Careful! Strings are immutable
You cannot change a character in place:
```python
word = "Python"
word[0] = "J"   # TypeError: 'str' object does not support item assignment
```
Instead, build a new string:
```python
word = "J" + word[1:]
print(word)  # Jython
```
:::

## Common string methods

```python
s = "  Hello, World!  "

print(s.strip())            # "Hello, World!"   removes leading/trailing whitespace
print(s.lower())            # "  hello, world!  "
print(s.upper())            # "  HELLO, WORLD!  "
print(s.strip().replace("World", "Python"))  # "Hello, Python!"
print(s.strip().split(", "))  # ['Hello', 'World!']

print("hello".startswith("he"))  # True
print("hello".endswith("lo"))    # True
print("hello".find("l"))         # 2  (index of first match, -1 if not found)
print("l" in "hello")            # True
```

Joining a list of strings back together:

```python
words = ["Python", "is", "fun"]
sentence = " ".join(words)
print(sentence)  # Python is fun
```

## Length

```python
print(len("hello"))  # 5
```

## Strings are iterable

You can loop over a string character by character:

```python
for char in "abc":
    print(char)
```

```
a
b
c
```

More on `for` loops in [Loops](/fundamentals/loops).

**Next up:** [Type Conversion →](/fundamentals/type-conversion)
