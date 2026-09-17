# Threading & Multiprocessing

Sometimes a program needs to do multiple things "at once" — download several files, handle multiple client connections, or use multiple CPU cores for heavy computation. Python offers two different approaches, and picking the right one matters.

## The Global Interpreter Lock (GIL)

Before reaching for threads, you need to know about Python's **GIL** — a lock that allows only **one thread** to execute Python bytecode at a time, even on a multi-core machine.

This means:

- **Threads do NOT give you true CPU parallelism** in the standard Python interpreter (CPython). Two threads doing heavy math don't run genuinely simultaneously.
- **Threads DO help with I/O-bound work** — waiting on a network request, reading a file, waiting on a database — because the GIL is released while a thread is waiting on I/O, letting other threads run during that wait.

::: tip
As of Python 3.13, an experimental "free-threaded" build without the GIL exists, but it isn't the default yet and most libraries aren't fully adapted to it. For now, plan around the GIL being present.
:::

## `threading` — good for I/O-bound work

```python
import threading
import time

def download_file(name, delay):
    print(f"Starting download: {name}")
    time.sleep(delay)   # simulates waiting on a network response
    print(f"Finished download: {name}")

threads = []
for name, delay in [("file1.zip", 2), ("file2.zip", 1), ("file3.zip", 3)]:
    thread = threading.Thread(target=download_file, args=(name, delay))
    threads.append(thread)
    thread.start()

for thread in threads:
    thread.join()   # wait for each thread to finish

print("All downloads complete")
```

Because each "download" spends most of its time *waiting*, not computing, all three effectively run concurrently — the whole program finishes in about 3 seconds, not 2+1+3=6.

## The danger of shared state: race conditions

When multiple threads read and modify the same data, you can get a **race condition** — the result depends on unpredictable timing:

```python
import threading

counter = 0

def increment():
    global counter
    for _ in range(100_000):
        counter += 1   # NOT atomic — can be interrupted mid-operation

threads = [threading.Thread(target=increment) for _ in range(4)]
for t in threads:
    t.start()
for t in threads:
    t.join()

print(counter)   # often NOT 400000 — the exact number varies between runs!
```

Fix this with a `threading.Lock`, used as a [context manager](/error-handling/context-managers) to ensure only one thread modifies `counter` at a time:

```python
import threading

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100_000):
        with lock:
            counter += 1

threads = [threading.Thread(target=increment) for _ in range(4)]
for t in threads:
    t.start()
for t in threads:
    t.join()

print(counter)   # reliably 400000
```

## `multiprocessing` — good for CPU-bound work

To actually use multiple CPU cores for heavy computation, use separate **processes** instead of threads. Each process has its own Python interpreter and its own GIL, so they run truly in parallel:

```python
from multiprocessing import Pool
import time

def cpu_heavy_task(n):
    total = sum(i * i for i in range(n))
    return total

numbers = [10_000_000, 10_000_000, 10_000_000, 10_000_000]

start = time.time()
with Pool(processes=4) as pool:
    results = pool.map(cpu_heavy_task, numbers)
print(f"Done in {time.time() - start:.2f}s")
print(results)
```

With 4 CPU cores available, this can run close to 4x faster than doing the same work sequentially, since each process genuinely runs on its own core.

::: warning Careful! Processes don't share memory
Unlike threads, separate processes don't automatically share variables — data passed to/from a `Pool` must be picklable (serializable), and modifying a variable in one process has no effect on another. Communication between processes requires explicit tools like `multiprocessing.Queue` or shared memory objects.
:::

## Choosing between them

| Workload | Tool |
|---|---|
| Waiting on network/disk (I/O-bound) | `threading`, or better, [`asyncio`](/concurrency/asyncio) |
| Heavy computation (CPU-bound) | `multiprocessing` |
| Both `threading` and `asyncio` for I/O — which one? | `asyncio` scales to far more concurrent tasks with less overhead, but requires your whole call chain to be written with `async`/`await` |

**Next up:** [Async / Await (asyncio) →](/concurrency/asyncio)
