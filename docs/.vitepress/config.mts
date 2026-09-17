import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'The Modern Python Tutorial',
  description: 'A beginner-friendly, well-organized Python tutorial inspired by javascript.info',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }]
  ],

  markdown: {
    lineNumbers: false,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'Python Tutorial',

    nav: [
      { text: 'Tutorial', link: '/getting-started/', activeMatch: '/.*/' },
      {
        text: 'Chapters',
        items: [
          { text: '1. Getting Started', link: '/getting-started/' },
          { text: '2. Fundamentals', link: '/fundamentals/variables' },
          { text: '3. Data Structures', link: '/data-structures/lists' },
          { text: '4. Functions In-Depth', link: '/functions-deep-dive/args-kwargs' },
          { text: '5. Object-Oriented Programming', link: '/oop/classes-and-objects' },
          { text: '6. Error Handling', link: '/error-handling/exceptions' },
          { text: '7. Modules & Packages', link: '/modules-packages/modules' },
          { text: '8. Files & I/O', link: '/files-io/reading-writing-files' },
          { text: '9. Standard Library', link: '/standard-library/datetime' },
          { text: '10. Concurrency', link: '/concurrency/threading-and-multiprocessing' },
          { text: '11. Advanced Topics', link: '/advanced/type-hints' },
          { text: '12. Testing & Tools', link: '/testing-and-tools/debugging' }
        ]
      }
    ],

    sidebar: [
      {
        text: '1. Getting Started',
        collapsed: false,
        items: [
          { text: 'Introduction to Python', link: '/getting-started/' },
          { text: 'Installing Python', link: '/getting-started/installation' },
          { text: 'Running Python Code', link: '/getting-started/running-python' },
          { text: 'Your First Program', link: '/getting-started/first-steps' }
        ]
      },
      {
        text: '2. Python Fundamentals',
        collapsed: false,
        items: [
          { text: 'Variables', link: '/fundamentals/variables' },
          { text: 'Data Types', link: '/fundamentals/data-types' },
          { text: 'Numbers', link: '/fundamentals/numbers' },
          { text: 'Strings', link: '/fundamentals/strings' },
          { text: 'Type Conversion', link: '/fundamentals/type-conversion' },
          { text: 'Operators', link: '/fundamentals/operators' },
          { text: 'User Input & Output', link: '/fundamentals/input-output' },
          { text: 'Conditionals', link: '/fundamentals/conditionals' },
          { text: 'Loops', link: '/fundamentals/loops' },
          { text: 'Functions', link: '/fundamentals/functions' },
          { text: 'Lambda Functions', link: '/fundamentals/lambda-functions' },
          { text: 'Scope', link: '/fundamentals/scope' },
          { text: 'Code Style (PEP 8)', link: '/fundamentals/code-style' }
        ]
      },
      {
        text: '3. Data Structures',
        collapsed: false,
        items: [
          { text: 'Lists', link: '/data-structures/lists' },
          { text: 'Tuples', link: '/data-structures/tuples' },
          { text: 'Dictionaries', link: '/data-structures/dictionaries' },
          { text: 'Sets', link: '/data-structures/sets' },
          { text: 'Comprehensions', link: '/data-structures/comprehensions' },
          { text: 'Unpacking', link: '/data-structures/unpacking' },
          { text: 'Nested Data Structures', link: '/data-structures/nested-data-structures' }
        ]
      },
      {
        text: '4. Functions In-Depth',
        collapsed: false,
        items: [
          { text: '*args and **kwargs', link: '/functions-deep-dive/args-kwargs' },
          { text: 'Closures', link: '/functions-deep-dive/closures' },
          { text: 'Decorators', link: '/functions-deep-dive/decorators' },
          { text: 'Iterators', link: '/functions-deep-dive/iterators' },
          { text: 'Generators', link: '/functions-deep-dive/generators' },
          { text: 'Recursion', link: '/functions-deep-dive/recursion' }
        ]
      },
      {
        text: '5. Object-Oriented Programming',
        collapsed: false,
        items: [
          { text: 'Classes and Objects', link: '/oop/classes-and-objects' },
          { text: 'Inheritance', link: '/oop/inheritance' },
          { text: 'Encapsulation', link: '/oop/encapsulation' },
          { text: 'Properties', link: '/oop/properties' },
          { text: 'Polymorphism', link: '/oop/polymorphism' },
          { text: 'Magic Methods', link: '/oop/magic-methods' },
          { text: 'Static & Class Methods', link: '/oop/class-static-methods' },
          { text: 'Abstract Base Classes', link: '/oop/abstract-classes' }
        ]
      },
      {
        text: '6. Error Handling',
        collapsed: false,
        items: [
          { text: 'Exceptions', link: '/error-handling/exceptions' },
          { text: 'try / except / finally', link: '/error-handling/try-except-finally' },
          { text: 'Custom Exceptions', link: '/error-handling/custom-exceptions' },
          { text: 'Context Managers', link: '/error-handling/context-managers' }
        ]
      },
      {
        text: '7. Modules & Packages',
        collapsed: false,
        items: [
          { text: 'Modules', link: '/modules-packages/modules' },
          { text: 'Packages', link: '/modules-packages/packages' },
          { text: 'Virtual Environments', link: '/modules-packages/virtual-environments' },
          { text: 'pip and Packaging', link: '/modules-packages/pip-and-packaging' }
        ]
      },
      {
        text: '8. Files & I/O',
        collapsed: false,
        items: [
          { text: 'Reading & Writing Files', link: '/files-io/reading-writing-files' },
          { text: 'Working with Paths', link: '/files-io/working-with-paths' },
          { text: 'JSON and CSV', link: '/files-io/json-and-csv' }
        ]
      },
      {
        text: '9. Standard Library Tour',
        collapsed: false,
        items: [
          { text: 'datetime', link: '/standard-library/datetime' },
          { text: 'collections', link: '/standard-library/collections-module' },
          { text: 'itertools', link: '/standard-library/itertools-module' },
          { text: 'functools', link: '/standard-library/functools-module' },
          { text: 'Regular Expressions (re)', link: '/standard-library/regular-expressions' },
          { text: 'os and sys', link: '/standard-library/os-and-sys' }
        ]
      },
      {
        text: '10. Concurrency',
        collapsed: false,
        items: [
          { text: 'Threading & Multiprocessing', link: '/concurrency/threading-and-multiprocessing' },
          { text: 'Async / Await (asyncio)', link: '/concurrency/asyncio' }
        ]
      },
      {
        text: '11. Advanced Topics',
        collapsed: false,
        items: [
          { text: 'Type Hints', link: '/advanced/type-hints' },
          { text: 'Dataclasses', link: '/advanced/dataclasses' },
          { text: 'Descriptors', link: '/advanced/descriptors' },
          { text: 'Metaclasses', link: '/advanced/metaclasses' }
        ]
      },
      {
        text: '12. Testing & Tools',
        collapsed: false,
        items: [
          { text: 'Debugging', link: '/testing-and-tools/debugging' },
          { text: 'unittest & pytest', link: '/testing-and-tools/unittest-and-pytest' },
          { text: 'Logging', link: '/testing-and-tools/logging' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next'
    }
  }
})
