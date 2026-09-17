# pip and Packaging

`pip` is Python's package installer. It downloads and installs third-party libraries from the **Python Package Index** ([PyPI](https://pypi.org)), the central repository most Python packages are published to.

## Installing a package

Always do this with a [virtual environment](/modules-packages/virtual-environments) active:

```bash
pip install requests
```

```python
import requests

response = requests.get("https://api.github.com")
print(response.status_code)  # 200
```

## Installing a specific version

```bash
pip install requests==2.31.0     # exact version
pip install "requests>=2.25,<3"  # a version range
```

## Useful `pip` commands

```bash
pip list                       # show installed packages
pip show requests               # details about one package
pip install --upgrade requests  # upgrade to the latest version
pip uninstall requests          # remove a package
```

## `requirements.txt` — recording your dependencies

Instead of telling teammates "run `pip install requests`, `pip install flask`, ..." one by one, record every dependency in a single file:

```
# requirements.txt
requests==2.31.0
flask==3.0.0
python-dotenv==1.0.0
```

Generate this file automatically from what's currently installed:

```bash
pip freeze > requirements.txt
```

Anyone setting up the project then runs one command to match your exact environment:

```bash
pip install -r requirements.txt
```

::: tip
Pin exact versions (`==`) in `requirements.txt` for applications, so everyone gets identical, reproducible environments. Libraries you publish for others to depend on typically use looser ranges (`>=2.0,<3.0`) to avoid forcing unnecessary constraints on the projects that use them.
:::

## `pyproject.toml` — the modern standard

Newer projects increasingly define their metadata and dependencies in `pyproject.toml` instead of (or alongside) `requirements.txt`. It's the standardized, tool-agnostic format for describing a Python project:

```toml
[project]
name = "my-project"
version = "0.1.0"
dependencies = [
    "requests>=2.25",
    "flask>=3.0",
]

[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"
```

Tools like `poetry`, `uv`, and modern `pip` itself can all read this file.

## Publishing your own package (a brief overview)

If you build something worth sharing, the general shape of publishing to PyPI is:

1. Structure your project with a `pyproject.toml` describing its name, version, and dependencies.
2. Build a distributable package: `python3 -m build`
3. Upload it: `twine upload dist/*`

This is a deep enough topic to warrant its own dedicated guide once you're ready to publish — for now, focus on *consuming* packages with `pip install`, which covers the vast majority of day-to-day Python work.

This wraps up modules and packaging. Next, we'll look at reading and writing files.

**Next up:** Chapter 8 — [Reading & Writing Files →](/files-io/reading-writing-files)
