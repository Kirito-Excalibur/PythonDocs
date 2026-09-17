# Async / Await (asyncio)

`asyncio` provides a way to write concurrent, I/O-bound code using a single thread — instead of the OS switching between threads, your own code cooperatively yields control at specific points, using `async` and `await`.

## Why not just use threading?

Threads work, but each one carries real overhead (memory, OS scheduling), which limits you to maybe a few thousand concurrent threads at most. `asyncio` can comfortably manage tens of thousands of concurrent tasks in a single thread, since "waiting" tasks cost almost nothing while idle. This makes it the standard choice for things like web servers and network clients handling many simultaneous connections.

## `async def` and `await`

```python
import asyncio

async def say_hello():
    print("Hello...")
    await asyncio.sleep(1)   # pauses THIS task, letting others run meanwhile
    print("...World!")

asyncio.run(say_hello())
```

- `async def` defines a **coroutine function**. Calling it doesn't run the body immediately — it returns a coroutine *object*, which needs to be awaited or scheduled to actually execute.
- `await` pauses the current coroutine until the awaited operation completes, **without blocking the entire program** — other coroutines can run during that pause.
- `asyncio.run()` is the entry point that starts the event loop and runs a coroutine to completion. You typically call it exactly once, at the top level of your program.

::: warning Careful! `await` only works inside `async def`
```python
def regular_function():
    await asyncio.sleep(1)   # SyntaxError — 'await' outside async function
```
And calling a coroutine without `await` doesn't run it — it just creates the coroutine object, silently:
```python
async def main():
    say_hello()   # does NOTHING useful — creates a coroutine, never runs it
                   # (Python usually warns: "coroutine was never awaited")
```
:::

## Running things concurrently with `asyncio.gather`

The real payoff of `asyncio` — running multiple coroutines concurrently instead of one after another:

```python
import asyncio
import time

async def download(name, delay):
    print(f"Starting: {name}")
    await asyncio.sleep(delay)
    print(f"Finished: {name}")
    return f"{name} result"

async def main():
    start = time.time()
    results = await asyncio.gather(
        download("file1.zip", 2),
        download("file2.zip", 1),
        download("file3.zip", 3),
    )
    print(f"All done in {time.time() - start:.2f}s")
    print(results)

asyncio.run(main())
```

```
Starting: file1.zip
Starting: file2.zip
Starting: file3.zip
Finished: file2.zip
Finished: file1.zip
Finished: file3.zip
All done in 3.00s
['file1.zip result', 'file2.zip result', 'file3.zip result']
```

All three "downloads" run concurrently — the total time is roughly the *longest* single delay (3 seconds), not the sum of all three (6 seconds), because each `await asyncio.sleep(...)` yields control back to the event loop while waiting.

## Compare this to sequential `await`

```python
async def main():
    r1 = await download("file1.zip", 2)   # waits 2s before starting the next
    r2 = await download("file2.zip", 1)
    r3 = await download("file3.zip", 3)
    # total time: 2 + 1 + 3 = 6 seconds — no concurrency at all
```

Awaiting each coroutine one at a time, in sequence, gives you no concurrency benefit — you have to use `gather` (or `asyncio.create_task`) to actually run things side-by-side.

## Creating and managing tasks

`asyncio.create_task()` schedules a coroutine to start running in the background immediately, without waiting for it:

```python
import asyncio

async def background_work():
    await asyncio.sleep(2)
    print("Background work done")

async def main():
    task = asyncio.create_task(background_work())   # starts running immediately
    print("Doing other things while background_work runs...")
    await asyncio.sleep(1)
    print("Still going...")
    await task   # now actually wait for it to finish
    print("All done")

asyncio.run(main())
```

## `async for` and async context managers

Some objects support asynchronous iteration and context management — most commonly seen with async database drivers and HTTP clients:

```python
async def process_stream(stream):
    async for chunk in stream:
        print(chunk)

async def use_connection():
    async with get_connection() as conn:   # example, not a real function
        await conn.execute("SELECT 1")
```

## When to reach for `asyncio`

- Building a server that needs to handle many concurrent connections (web servers, chat servers).
- Making many concurrent HTTP requests (with an async-compatible library like `aiohttp` or `httpx`).
- Any I/O-heavy workload where you want more concurrency than `threading` comfortably provides.

For CPU-bound work, `asyncio` doesn't help at all — a single long-running computation still blocks the entire event loop. That's still the job of [`multiprocessing`](/concurrency/threading-and-multiprocessing).

This wraps up concurrency. Next, we'll cover several advanced Python features: type hints, dataclasses, descriptors, and metaclasses.

**Next up:** Chapter 11 — [Type Hints →](/advanced/type-hints)
