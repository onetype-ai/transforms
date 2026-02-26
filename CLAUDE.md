# CLAUDE.md - OneType Transforms

## What this is

Source repository for all [OneType Transforms](https://transforms.onetype.ai/) items. Each transform is a standalone UI component that runs on any website via CDN script tag.

Transforms are activated with the `ot` attribute: `<div ot="my-transform">`. The runtime scans the DOM, matches elements, parses config from attributes, and executes the transform code.

---

## Before you start

Before building or modifying any transform, research the external library documentation first. If the transform uses a third-party library (Swiper, Typed.js, Chart.js, etc.), read the official docs to understand the full API, available options, and best practices. Suggest this to the user before writing any code. This prevents mistakes, missed features, and incorrect configurations.

---

## Rules

- Never modify anything in `server/`
- One transform per folder in `items/`
- Every transform must have `demo.html` and `overview.md`
- Keep code clean, focused, minimal comments
- No unused variables, no dead code
- Use `this.methodName = () => {}` to organize logic inside `code`
- Prefer short, descriptive names
- CSS is optional but encouraged for visual transforms
- External libraries via CDN URLs in `js` and `css` arrays
- Always test with `node server {name}` before committing

---

## File structure

```
items/
  my-transform/
    my-transform.js   # Transform definition (required)
    my-transform.css   # Styles (optional)
    demo.html          # Demo markup (required)
    overview.md        # Description for marketplace (required)
```

File names for `.js` and `.css` don't matter - all files in the folder are auto-loaded. `demo.html` and `overview.md` must be named exactly.

---

## Transform definition

```js
transforms.ItemAdd({
    id: 'my-transform',
    icon: 'star',
    name: 'My Transform',
    description: 'Short description of what it does.',
    js: [],
    css: [],
    config: {},
    code: function(data, node, transformer) {}
});
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | Unique identifier, matches `ot="id"` |
| icon | string | no | Material Design icon name (default: 'sync_alt') |
| name | string | yes | Display name |
| description | string | yes | One-line description |
| js | array | no | External JS CDN URLs to load before code runs |
| css | array | no | External CSS CDN URLs to load before code runs |
| config | object | no | Configuration schema (see below) |
| code | function | yes | Main function: `function(data, node, transformer)` |
| destroy | function | no | Cleanup function |
| structure | function | no | Structure definition function |

### Code function

```js
code: function(data, node, transformer)
{
    // data    - parsed config values from HTML attributes
    // node    - the DOM element with ot="id"
    // transformer - the transform item instance
}
```

Organize with `this`:

```js
code: function(data, node, transformer)
{
    this.setup = () =>
    {
        node.classList.add('my-transform');
    };

    this.render = () =>
    {
        const el = document.createElement('div');
        el.textContent = data['label'];
        node.appendChild(el);
    };

    this.events = () =>
    {
        node.addEventListener('click', () =>
        {
            node.classList.toggle('active');
        });
    };

    this.setup();
    this.render();
    this.events();
}
```

---

## Config

Config defines what attributes the user can set on the HTML element. Values are automatically parsed from DOM attributes and validated.

### Array format (short)

```js
config: {
    'color': ['string', 'red'],
    'size': ['number', 16],
    'loop': ['boolean', false],
    'items': ['array', []],
    'options': ['object', {}]
}
```

Format: `[type, default]`

### Object format (detailed)

```js
config: {
    'variant': {
        type: 'string',
        value: 'default',
        options: ['default', 'outline', 'ghost']
    },
    'count': {
        type: 'number',
        value: 3
    }
}
```

Format: `{ type, value, options }`

### Supported types

| Type | Attribute example | Parsed value |
|------|-------------------|--------------|
| string | `color="red"` | `'red'` |
| number | `size="16"` | `16` |
| boolean | `loop="true"` | `true` |
| array | `items="[1, 2, 3]"` | `[1, 2, 3]` |
| object | `config="{ key: 'val' }"` | `{ key: 'val' }` |

### How parsing works

1. Raw string is read from HTML attribute
2. `onetype.Function()` evaluates it as a safe JS expression
3. `DataDefineOne()` validates against config type
4. If type matches, value is used
5. If type doesn't match, default value is used
6. Attribute is removed from the DOM node

Examples:
- `"42"` with config `['number', 0]` -> `42`
- `"true"` with config `['boolean', false]` -> `true`
- `"[1,2,3]"` with config `['array', []]` -> `[1, 2, 3]`
- `"hello"` with config `['number', 10]` -> `10` (fallback to default)

### Config naming

- Use lowercase kebab-case: `'slide-speed'`, `'auto-play'`, `'show-dots'`
- Match the HTML attribute exactly: `<div ot="x" slide-speed="500">`
- Keep names short and descriptive

---

## External dependencies

Load third-party libraries via CDN:

```js
transforms.ItemAdd({
    id: 'swiper',
    js: ['https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'],
    css: ['https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'],
    code: function(data, node, transformer)
    {
        // Swiper is now available globally
        new Swiper(node, { ... });
    }
});
```

Dependencies are loaded once and cached. Multiple transforms sharing the same URL won't load it twice.

---

## CSS

Write styles in a separate `.css` file. Prefix all classes with `ot-{id}-` to avoid conflicts:

```css
.ot-counter {
    display: flex;
    gap: var(--ot-spacing-m);
}

.ot-counter-item {
    padding: var(--ot-spacing-s);
    border-radius: var(--ot-radius-m);
    background: var(--ot-bg-2);
}

.ot-counter-item.active {
    border: 1px solid var(--ot-brand);
}
```

### Available CSS variables

**Spacing:** `--ot-spacing-x` (4px), `--ot-spacing-s` (8px), `--ot-spacing-m` (16px), `--ot-spacing-l` (34px)

**Radius:** `--ot-radius-s` (4px), `--ot-radius-m` (8px), `--ot-radius-l` (12px)

**Heights:** `--ot-height-x` (18px), `--ot-height-s` (28px), `--ot-height-m` (34px), `--ot-height-l` (44px)

**Font sizes:** `--ot-size-s` (11px), `--ot-size-m` (13px), `--ot-size-l` (22px)

**Fonts:** `--ot-font-primary`, `--ot-font-secondary` (Inter)

**Backgrounds:** `--ot-bg-1` through `--ot-bg-4` (each with `-border`, `-opacity`, `-hover` variants)

**Text:** `--ot-text-1` (primary), `--ot-text-2` (secondary)

**Colors:** `--ot-brand`, `--ot-blue`, `--ot-red`, `--ot-orange`, `--ot-green` (each with `-border`, `-opacity`, `-hover` variants)

---

## Demo HTML

The `demo.html` file contains only the body content - no `<html>`, `<head>`, or `<body>` tags. The dev server wraps it in a plain `<body>` with no default styling — the demo must handle its own layout, spacing, and centering.

Use a `<style>` block at the top with classes instead of inline styles. Class names should be short and descriptive — no prefixes needed since each demo is an isolated file.

```html
<style>
    .examples { display: flex; flex-direction: column; gap: 40px; max-width: 700px; margin: 0 auto; padding: 40px 30px; }
    .examples h3 { color: var(--ot-text-2); margin-bottom: var(--ot-spacing-s); }
</style>

<div class="examples">
    <div>
        <h3>Default</h3>
        <div ot="my-transform">
            <p>Content</p>
        </div>
    </div>
    <div>
        <h3>Custom config</h3>
        <div ot="my-transform" color="red" size="32">
            <p>Content</p>
        </div>
    </div>
</div>
```

---

## Overview

The `overview.md` file is a free-form markdown description displayed on the marketplace page. Explain what the transform does and what configuration options are available. No fixed structure required - write what makes sense for the transform.

Do not include HTML usage examples - those are handled separately by `demo.html` and the platform's usage field.

---

## Runtime flow

1. Page loads, `[ot]` elements have `opacity: 0` (cloak)
2. Framework scans DOM for `[ot]` elements
3. For each element, reads `ot` attribute value (transform ID)
4. Loads external JS/CSS dependencies if any
5. Parses config from element attributes
6. Calls `code(data, node, transformer)`
7. MutationObserver watches for dynamically added `[ot]` elements

---

## Code style

```js
// Allman brace style — always with braces, never inline
if(condition)
{
    doSomething();
}

// WRONG — never do this
if(condition) doSomething();
if(!x) return;

// No space before parens in control structures
if(x)
for(let i = 0; i < n; i++)
while(running)

// Space after comma
const config = { key: 'value', other: true };

// Single quotes for strings
const name = 'accordion';

// No semicolons after function declarations in transforms.ItemAdd
// (the code runs in a specific context)

// Clean variable names, no abbreviations
const element = document.createElement('div');
const container = node.querySelector('.wrapper');
const duration = data['animation-duration'];
```

### Method guidelines

- Every `this.methodName` must be **modular** — single purpose, 10-15 lines max.
- High **reusability** and **abstraction**: extract helpers for repeated patterns instead of duplicating code.
- Each method should be callable independently. Build, update, events — separate concerns.
- Precompute direction-dependent or mode-dependent values **once at the top** of `code`, not inside methods.

```js
code: function(data, node, transformer)
{
    const vertical = data['direction'] === 'vertical';
    const side = vertical ? 'top' : 'left';

    // Reusable helper — used by build, label, etc.
    this.element = (tag, className, parent) =>
    {
        const element = document.createElement(tag);
        element.className = className;
        parent.appendChild(element);
        return element;
    };

    // Single purpose — only updates positions
    this.update = (value) =>
    {
        this.line.style[side] = value + '%';
    };

    // Orchestrates everything
    this.build = () =>
    {
        // ...
        this.update(data['position']);
        this.events(input);
    };

    this.build();
}
```

### Triggers and interactivity

The framework does not provide generic trigger mechanisms (`ot-trigger`, etc.). Each transform controls its own behavior inside `code()` — scroll detection via IntersectionObserver, click handlers via addEventListener, hover via mousemove, etc. This keeps transforms independent and avoids framework complexity that doesn't fit every use case.

---

## Complete example

**items/counter/counter.js**
```js
transforms.ItemAdd({
    id: 'counter',
    icon: 'add_circle',
    name: 'Counter',
    description: 'Interactive counter with increment and decrement buttons.',
    config: {
        'value': ['number', 0],
        'min': ['number', 0],
        'max': ['number', 100],
        'step': ['number', 1]
    },
    code: function(data, node, transformer)
    {
        let count = data['value'];

        this.render = () =>
        {
            node.classList.add('ot-counter');
            node.innerHTML = '';

            const minus = document.createElement('button');
            minus.className = 'counter-button';
            minus.textContent = '-';

            const display = document.createElement('span');
            display.className = 'counter-display';
            display.textContent = count;

            const plus = document.createElement('button');
            plus.className = 'counter-button';
            plus.textContent = '+';

            node.appendChild(minus);
            node.appendChild(display);
            node.appendChild(plus);

            this.display = display;
            this.minus = minus;
            this.plus = plus;
        };

        this.update = () =>
        {
            this.display.textContent = count;
            this.minus.disabled = count <= data['min'];
            this.plus.disabled = count >= data['max'];
        };

        this.events = () =>
        {
            this.minus.addEventListener('click', () =>
            {
                count = Math.max(data['min'], count - data['step']);
                this.update();
            });

            this.plus.addEventListener('click', () =>
            {
                count = Math.min(data['max'], count + data['step']);
                this.update();
            });
        };

        this.render();
        this.update();
        this.events();
    }
});
```

**items/counter/counter.css**
```css
.ot-counter {
    display: flex;
    align-items: center;
    gap: var(--ot-spacing-s);
}

.ot-counter-button {
    width: var(--ot-height-m);
    height: var(--ot-height-m);
    border: 1px solid var(--ot-bg-3-border);
    border-radius: var(--ot-radius-s);
    background: var(--ot-bg-2);
    color: var(--ot-text-1);
    font-size: var(--ot-size-m);
    cursor: pointer;
}

.ot-counter-button:hover {
    background: var(--ot-bg-2-hover);
}

.ot-counter-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.ot-counter-display {
    min-width: 40px;
    text-align: center;
    font-size: var(--ot-size-l);
    color: var(--ot-text-1);
}
```

**items/counter/demo.html**
```html
<style>
    .examples { display: flex; flex-direction: column; gap: 40px; }
    .examples h3 { color: var(--ot-text-2); margin-bottom: var(--ot-spacing-s); }
</style>

<div class="examples">
    <div>
        <h3>Default</h3>
        <div ot="counter"></div>
    </div>
    <div>
        <h3>Custom range</h3>
        <div ot="counter" value="50" min="0" max="100" step="10"></div>
    </div>
</div>
```

**items/counter/overview.md**
```md
Interactive counter with increment and decrement buttons. Useful for quantity selectors, voting, or any numeric input.

Supports configurable min/max range and custom step size.

### Options

- **value** - starting value (default: 0)
- **min** - minimum value (default: 0)
- **max** - maximum value (default: 100)
- **step** - increment/decrement amount (default: 1)
```

---

## Dev server

```bash
node server counter
```

Opens on `http://localhost:3000`. Loads framework styles, transform runtime, and your transform's JS/CSS automatically.
