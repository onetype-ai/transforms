# OneType Transforms

Source repository for all [OneType Transforms](https://transforms.onetype.ai/) items.

## Getting started

```bash
git clone git@github.com:onetype-ai/transforms.git
cd transforms
npm install
```

## Creating a transform

Each transform lives in its own folder inside `items/`:

```
items/my-transform/
  my-transform.js      # Transform logic (required)
  my-transform.css     # Styles (optional)
  usage.html           # Clean copy-paste example (required)
  overview.md          # Marketplace description (required)
  previews/            # Visual examples (required, 1-5 files)
    default.html
    variant.html
```

### 1. Transform definition

```js
transforms.ItemAdd({
    id: 'my-transform',
    name: 'My Transform',
    description: 'What it does.',
    config: {
        'speed': ['number', 50],
        'color': ['string', 'red']
    },
    code: function(data, node, transformer)
    {
        // data['speed'] = 50, data['color'] = 'red'
        // node = the DOM element with ot="my-transform"
    }
});
```

### 2. Usage

`usage.html` is a clean example that works out of the box with default config. No `<style>` block, no inline styles. Just copy-paste and it works.

```html
<div ot="my-transform">
    <p>Content here</p>
</div>
```

### 3. Previews

Each file in `previews/` is a self-contained visual example with a `<style>` block and HTML. Prefix all CSS classes with the file name to avoid conflicts.

```html
<!-- previews/colored.html -->
<style>
    .colored .box {
        background: var(--ot-bg-2);
        border: 1px solid var(--ot-bg-2-border);
        border-radius: var(--ot-radius-l);
        padding: var(--ot-spacing-l);
    }
    .colored .box p {
        color: var(--ot-text-1);
        font-size: var(--ot-size-m);
    }
</style>

<div ot="my-transform" ot-color="blue" class="colored">
    <div class="box">
        <p>Blue variant</p>
    </div>
</div>
```

Always use CSS variables instead of hardcoded values. The full list is in `CLAUDE.md`.

### 4. Overview

`overview.md` describes what the transform does. 150-400 words, markdown formatted. Don't list config options - those belong to the version, not the transform.

### 5. CSS (optional)

`{name}.css` for transform-specific styles. Prefix classes with `ot-{id}-` to avoid conflicts.

## Config attributes

Config values are passed via `ot-` prefixed HTML attributes:

```html
<div ot="my-transform" ot-speed="100" ot-color="blue">
```

`ot="id"` identifies the transform. All other config uses the `ot-` prefix.

### Supported types

| Type | Example | Parsed as |
|------|---------|-----------|
| string | `ot-color="red"` | `'red'` |
| number | `ot-speed="50"` | `50` |
| boolean | `ot-loop="true"` | `true` |
| array | `ot-items="[1,2,3]"` | `[1, 2, 3]` |
| object | `ot-config="{ a: 1 }"` | `{ a: 1 }` |

## CSS variables

All transforms have access to the OneType design system variables:

```css
/* Spacing */
var(--ot-spacing-x)    /* 4px */
var(--ot-spacing-s)    /* 8px */
var(--ot-spacing-m)    /* 16px */
var(--ot-spacing-l)    /* 34px */

/* Radius */
var(--ot-radius-s)     /* 4px */
var(--ot-radius-m)     /* 8px */
var(--ot-radius-l)     /* 12px */

/* Heights */
var(--ot-height-x)     /* 18px */
var(--ot-height-s)     /* 28px */
var(--ot-height-m)     /* 34px */
var(--ot-height-l)     /* 44px */

/* Font sizes */
var(--ot-size-s)       /* 11px */
var(--ot-size-m)       /* 13px */
var(--ot-size-l)       /* 22px */

/* Fonts */
var(--ot-font-primary)     /* Inter */
var(--ot-font-secondary)   /* Inter */

/* Backgrounds (1-4, each with -border, -opacity, -hover) */
var(--ot-bg-1)         /* rgba(29, 29, 31, 1) */
var(--ot-bg-1-border)  /* rgba(43, 43, 45, 1) */
var(--ot-bg-2)         /* rgba(34, 34, 36, 1) */
var(--ot-bg-3)         /* rgba(39, 39, 41, 1) */
var(--ot-bg-4)         /* rgba(44, 44, 46, 1) */

/* Text */
var(--ot-text-1)       /* rgba(225, 228, 232, 1) - primary */
var(--ot-text-2)       /* rgba(156, 156, 156, 1) - secondary */

/* Colors (each with -border, -opacity, -hover) */
var(--ot-brand)        /* rgba(226, 112, 85, 1) */
var(--ot-blue)         /* rgba(56, 189, 248, 1) */
var(--ot-red)          /* rgba(244, 63, 94, 1) */
var(--ot-orange)       /* rgba(251, 146, 60, 1) */
var(--ot-green)        /* rgba(52, 211, 153, 1) */
```

## Dev server

```bash
node server my-transform
```

Opens `http://localhost:3000`. Shows usage at the top, then each preview as a labeled section. Each section has a Copy button for the original HTML.

## Project structure

```
items/                  # All transform items
  anime/                # Example: anime transform
    anime.js
    anime.css
    usage.html
    overview.md
    previews/
      fade-up.html
      stagger.html
      zoom-in.html
      blur-in.html
      custom.html
server/                 # Dev server
  index.js
  back/                 # Server-side (assets, routes, http)
  front/                # Client-side (runtime, template)
CLAUDE.md               # AI development instructions
publish.md              # Database publishing workflow
```

## AI-assisted development

This repository includes `CLAUDE.md` with complete instructions for building transforms - code style, file structure, config format, CSS variables, preview rules, and publishing workflow.

## License

MIT