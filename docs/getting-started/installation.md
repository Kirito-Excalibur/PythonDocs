# Installing Python

## Check if Python is already installed

Many systems (especially macOS and Linux) come with Python pre-installed. Open a terminal and check:

```bash
python3 --version
```

If you see something like `Python 3.12.4`, you're set — skip ahead to [Running Python Code](/getting-started/running-python). If you get a "command not found" error, or the version is older than 3.9, follow the steps below for your operating system.

::: tip Why `python3` and not `python`?
On macOS and Linux, `python` sometimes points to the old, unsupported Python 2, or to nothing at all. Using `python3` explicitly avoids ambiguity. On Windows, `python` almost always refers to Python 3 already.
:::

## Windows

1. Go to [python.org/downloads](https://python.org/downloads) and download the latest Python 3 installer.
2. Run the installer. **Check the box that says "Add python.exe to PATH"** before clicking Install — this is the single most common thing people forget.
3. Open a new terminal (Command Prompt or PowerShell) and verify:

```bash
python --version
```

## macOS

The system Python on macOS is old and shouldn't be used for development. Two good options:

**Option A — official installer:** download from [python.org/downloads](https://python.org/downloads) and run the `.pkg` installer.

**Option B — Homebrew** (if you already use it):

```bash
brew install python
```

Then verify:

```bash
python3 --version
```

## Linux

Most distributions ship with Python 3 already. If you need to install or upgrade it:

```bash
# Debian / Ubuntu
sudo apt update
sudo apt install python3 python3-pip

# Fedora
sudo dnf install python3 python3-pip

# Arch
sudo pacman -S python python-pip
```

## A note on `pip`

`pip` is Python's package installer — it's how you'll install third-party libraries later. It's included automatically with Python 3.4+. Verify it's available:

```bash
pip3 --version
```

We'll cover `pip` properly in [pip and Packaging](/modules-packages/pip-and-packaging).

## Choosing an editor

You don't need anything fancy to start. Reasonable choices:

- **[VS Code](https://code.visualstudio.com/)** — free, lightweight, with an excellent official Python extension. Recommended for most beginners.
- **[PyCharm Community Edition](https://www.jetbrains.com/pycharm/)** — a full-featured, Python-specific IDE. Heavier, but very capable.
- Any plain text editor plus a terminal — perfectly fine, just less convenient.

::: tip
If you install VS Code, also install the official **Python extension** (search "Python" by Microsoft in the Extensions panel). It gives you syntax highlighting, autocomplete, and an integrated "Run" button.
:::

**Next up:** [Running Python Code →](/getting-started/running-python)
