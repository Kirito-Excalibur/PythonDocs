# Virtual Environments

A **virtual environment** is an isolated Python installation with its own set of installed packages, separate from your system Python and from other projects.

## Why you need them

Imagine Project A needs `django==4.2` and Project B needs `django==5.0`. If you installed packages globally, only one version could exist on your system at a time — installing one would break the other project. A virtual environment gives each project its own independent set of packages, so this conflict never happens.

::: warning Careful! Never install project dependencies globally
Installing packages system-wide (`pip install` without a virtual environment active) is a common beginner mistake that eventually causes exactly this kind of version conflict — often between totally unrelated projects on the same machine. **Always** work inside a virtual environment.
:::

## Creating a virtual environment

Python includes this tooling built in — no extra installation needed:

```bash
python3 -m venv .venv
```

This creates a `.venv` folder in your current directory containing a private copy of the Python interpreter and an isolated place for packages.

## Activating it

```bash
# macOS / Linux
source .venv/bin/activate

# Windows (Command Prompt)
.venv\Scripts\activate.bat

# Windows (PowerShell)
.venv\Scripts\Activate.ps1
```

Once activated, your terminal prompt usually changes to show the environment name:

```
(.venv) $ python3 --version
```

Any `pip install` now installs into `.venv`, not system-wide, and `python3` refers to the environment's own interpreter.

## Deactivating

```bash
deactivate
```

Returns you to your regular system Python.

## Typical workflow

```bash
cd my_project
python3 -m venv .venv
source .venv/bin/activate
pip install requests flask
# ... work on the project ...
deactivate
```

## Don't commit `.venv` to version control

Add it to `.gitignore`:

```
# .gitignore
.venv/
__pycache__/
*.pyc
```

Instead of committing the environment itself, you record *which packages* are needed (covered in [pip and Packaging](/modules-packages/pip-and-packaging)) so anyone can recreate an equivalent environment.

## Checking which environment is active

```bash
which python3      # macOS / Linux
where python        # Windows
```

If a virtual environment is active, this points inside its folder (e.g. `/path/to/project/.venv/bin/python3`) rather than your system Python.

## Other tools you may encounter

- **`conda`** — a package and environment manager popular in data science, which also manages non-Python dependencies.
- **`pipenv`** / **`poetry`** — higher-level tools that combine virtual environment management with dependency locking, aiming to be more convenient than the raw `venv` + `pip` workflow.
- **`uv`** — a newer, extremely fast tool (written in Rust) that can replace both `venv` and `pip` with a single, much quicker interface.

For learning purposes, `venv` + `pip` (the built-in tools covered here) are sufficient and universally understood — you can adopt one of these alternatives later once you understand what problem they're solving.

**Next up:** [pip and Packaging →](/modules-packages/pip-and-packaging)
