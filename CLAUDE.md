# CLAUDE.md - OneType Transforms

## Status: LAUNCHED

Source repository for [OneType Transforms](https://transforms.onetype.ai/) - standalone UI components delivered via CDN script tag. Part of the [OneType](https://onetype.ai) platform.

Pricing: Free $0 / Pro $149 / Agency $499 (lifetime).

---

## Repository structure

```
items/              # Transform source code (one folder per transform)
server/             # Dev server
publish.md          # Publishing workflow for database inserts
```

## Published transforms (17)

| Transform | Category | Tier | External deps |
|-----------|----------|------|---------------|
| anime | animation | Pro | anime.js |
| before-after | interaction | Free | - |
| count-up | animation | Pro | countup.js |
| lottie | media | Pro | lottie-web |
| magnetic | interaction | Free | - |
| leaflet | data | Pro | leaflet |
| marquee | animation | Free | - |
| orbit | animation | Free | - |
| particles | animation | Pro | particles.js |
| ripple | interaction | Free | - |
| scramble | text | Free | - |
| signature | media | Pro | signature_pad |
| split | text | Free | - |
| spotlight | interaction | Free | - |
| swiper | layout | Pro | swiper |
| tilt | interaction | Free | - |
| typewriter | text | Free | - |

## Transform file structure

```
items/{name}/
  {name}.js        # Transform definition (required)
  {name}.css       # Styles (optional)
  usage.html       # Clean copy-paste example (required)
  overview.md      # Marketplace description (required)
  previews/        # Visual examples (required, 1-5 files)
    effect-a.html
    effect-b.html
```

## Dev server

```bash
npm install
node server {name}
# Opens http://localhost:3000
```

Reads `usage.html` and all files from `previews/`, renders them as labeled sections with Copy buttons. File name becomes the label (e.g. `fade-up.html` -> "Fade Up").

---

## Rules

- One transform per folder in `items/`
- Every transform needs `usage.html`, `overview.md`, and at least one preview in `previews/`
- Test with `node server {name}` before committing
- When using external libraries, do a full research of the library docs first - read the API, understand the options, check examples. Don't guess, don't assume. You must fully understand the library before writing any code.
- Always use CSS variables (`var(--ot-*)`) - never hardcode colors, spacing, sizes, etc.
- Never overcomplicate - keep transforms simple and focused. Use the minimum code needed to get the job done.
- Use `-` in text, never the em dash

---

## Tier

- **Free** - simple transforms, no external libraries (tilt, ripple, magnetic, scramble, etc.)
- **Pro** - advanced transforms, external libraries, complex functionality (anime, swiper, leaflet, lottie, etc.)

---

## Transform definition

```js
transforms.ItemAdd({
    id: 'my-transform',
    icon: 'star',
    name: 'My Transform',
    description: 'Short description.',
    js: [],
    css: [],
    config: {},
    code: function(data, node, transformer) {}
});
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | Matches `ot="id"` in HTML |
| icon | string | no | [Material Symbols Rounded](https://fonts.google.com/icons?icon.set=Material+Symbols&icon.style=Rounded) name (default: 'sync_alt') |
| name | string | yes | Display name |
| description | string | yes | One-line description |
| js | array | no | External JS CDN URLs |
| css | array | no | External CSS CDN URLs |
| config | object | no | Configuration schema |
| code | function | yes | `function(data, node, transformer)` |
| destroy | function | no | Cleanup function |
| structure | function | no | Structure definition |

### Code function

```js
code: function(data, node, transformer)
{
    // data    - parsed config values from HTML attributes
    // node    - the DOM element with ot="id"
    // transformer - the transform item instance
}
```

---

## Config

### Array format

```js
config: {
    'color': ['string', 'red'],
    'size': ['number', 16],
    'loop': ['boolean', false]
}
```

### Object format

```js
config: {
    'variant': { type: 'string', value: 'default', options: ['default', 'outline'] },
    'count': { type: 'number', value: 3 }
}
```

### Types

| Type | Example | Parsed |
|------|---------|--------|
| string | `ot-color="red"` | `'red'` |
| number | `ot-size="16"` | `16` |
| boolean | `ot-loop="true"` | `true` |
| array | `ot-items="[1,2,3]"` | `[1,2,3]` |
| object | `ot-config="{ key: 'val' }"` | `{ key: 'val' }` |

Use lowercase kebab-case for config names: `'slide-speed'`, `'auto-play'`.

---

## CSS

Prefix classes with `ot-{id}-` to avoid conflicts. Always use CSS variables.

### Variables

```css
/* Spacing */
--ot-spacing-x: 4px;
--ot-spacing-s: 8px;
--ot-spacing-m: 16px;
--ot-spacing-l: 34px;

/* Radius */
--ot-radius-s: 4px;
--ot-radius-m: 8px;
--ot-radius-l: 12px;

/* Heights */
--ot-height-x: 18px;
--ot-height-s: 28px;
--ot-height-m: 34px;
--ot-height-l: 44px;

/* Font sizes */
--ot-size-s: 11px;
--ot-size-m: 13px;
--ot-size-l: 22px;

/* Fonts */
--ot-font-primary: Inter;
--ot-font-secondary: Inter;

/* Backgrounds (1 through 4, each with -border, -opacity, -hover) */
--ot-bg-1: rgba(29, 29, 31, 1);
--ot-bg-1-border: rgba(43, 43, 45, 1);
--ot-bg-1-opacity: rgba(29, 29, 31, 0.85);
--ot-bg-1-hover: rgba(33, 33, 35, 1);

--ot-bg-2: rgba(34, 34, 36, 1);
--ot-bg-2-border: rgba(48, 48, 50, 1);
--ot-bg-2-opacity: rgba(34, 34, 36, 0.85);
--ot-bg-2-hover: rgba(38, 38, 40, 1);

--ot-bg-3: rgba(39, 39, 41, 1);
--ot-bg-3-border: rgba(53, 53, 55, 1);
--ot-bg-3-opacity: rgba(39, 39, 41, 0.85);
--ot-bg-3-hover: rgba(43, 43, 45, 1);

--ot-bg-4: rgba(44, 44, 46, 1);
--ot-bg-4-border: rgba(58, 58, 60, 1);
--ot-bg-4-opacity: rgba(44, 44, 46, 0.85);
--ot-bg-4-hover: rgba(48, 48, 50, 1);

/* Text */
--ot-text-1: rgba(225, 228, 232, 1);   /* primary */
--ot-text-2: rgba(156, 156, 156, 1);   /* secondary */

/* Colors (each with -border, -opacity, -hover) */
--ot-brand: rgba(226, 112, 85, 1);
--ot-blue: rgba(56, 189, 248, 1);
--ot-red: rgba(244, 63, 94, 1);
--ot-orange: rgba(251, 146, 60, 1);
--ot-green: rgba(52, 211, 153, 1);
```

---

## Usage

`usage.html` - clean HTML that works out of the box with default config. No `<style>` block, no inline styles. Copy-paste ready.

```html
<div ot="my-transform">
    <p>Content here</p>
</div>
```

---

## Previews

Each file in `previews/` is a self-contained visual example. `<style>` block at top, HTML below.

### Class naming

Prefix all classes with the preview file name:

```html
<!-- previews/stagger.html -->
<style>
    .stagger .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--ot-spacing-m); }
    .stagger .card { background: var(--ot-bg-2); border: 1px solid var(--ot-bg-2-border); border-radius: var(--ot-radius-l); padding: var(--ot-spacing-l) var(--ot-spacing-m); text-align: center; }
    .stagger .card strong { color: var(--ot-text-1); font-size: 16px; }
    .stagger .card span { color: var(--ot-text-2); font-size: var(--ot-size-m); }
</style>

<div ot="anime" ot-stagger="100" class="stagger">
    <div class="cards">
        <div class="card">
            <strong>Fast</strong>
            <span>Lightweight engine</span>
        </div>
    </div>
</div>
```

### Design rules

- Dark background - light text on dark
- Realistic content - cards, stats, quotes, galleries. No placeholder text.
- CSS variables for everything - spacing, colors, borders, radius, font sizes
- Material Symbols icons via `<i>icon_name</i>` (e.g. `<i>bolt</i>`, `<i>star</i>`) - never HTML entities or emoji
- Each preview shows a different config or use case
- 1-5 previews per transform depending on complexity

---

## Overview

`overview.md` - free-form markdown for the marketplace page.

- Describes what the transform does and its general functionality
- 150-400 words
- Use markdown headers and lists to organize
- No config option listings (config belongs to the version, not the transform)
- Use `-` for lists
- Write naturally, like explaining to a developer

---

## Categories

| Category | ID | Slug |
|----------|----|------|
| Animations | 1 | animations |
| Text | 2 | text |
| Interaction | 3 | interaction |
| Layout | 4 | layout |
| Media | 5 | media |
| Navigation | 6 | navigation |
| Forms | 7 | forms |
| Data | 8 | data |
| Social | 9 | social |
| Utility | 10 | utility |

---

## Runtime flow

1. Page loads, `[ot]` elements have `opacity: 0` (cloak)
2. Framework scans DOM for `[ot]` elements
3. Loads external JS/CSS dependencies
4. Parses config from `ot-` prefixed attributes (e.g. `ot-speed="50"`)
5. Calls `code(data, node, transformer)`
6. MutationObserver watches for dynamically added `[ot]` elements

---

## Code style

- Allman brace style, always with braces
- No space before parens: `if(x)`, `for(...)`, `while(...)`
- Single quotes, space after comma
- `this.methodName = () => {}` pattern - modular, single-purpose, 10-15 lines max
- Precompute direction/mode values once at top of `code`
- No inline control flow: never `if(x) return;`
- Clean variable names, no abbreviations

---

## Publishing

See `publish.md` for the database publishing workflow.

---

## Git

- SSH remote with `github-onetype` host
- No Co-Authored-By lines