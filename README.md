# OneType Transforms

Source repository for all [OneType Transforms](https://transforms.onetype.ai/) items.

Transforms is a cloud SaaS platform that provides ready-to-use UI components via CDN integration. This repository contains the source code and demos for every transform available on the platform.

## Getting started

```bash
git clone git@github.com:onetype-ai/transforms.git
cd transforms
npm install
```

## AI-assisted development

This repository includes a `CLAUDE.md` file with detailed instructions for building transforms — coding rules, naming conventions, config patterns, and best practices. If you're using an AI coding assistant, point it to `CLAUDE.md` before starting.

## Creating a transform

1. Create a new folder inside `items/`:

```
items/
  my-transform/
    my-transform.js    # Transform logic (required)
    my-transform.css   # Styles (optional)
    demo.html          # Demo markup (required)
```

2. Define your transform in the `.js` file:

```js
transforms.ItemAdd({
    id: 'my-transform',
    name: 'My Transform',
    description: 'What it does.',
    config: {
        'color': ['string', 'red'],
        'size': ['number', 16]
    },
    code: function(data, node, transformer)
    {
        node.style.color = data['color'];
        node.style.fontSize = data['size'] + 'px';
    }
});
```

3. Write your demo HTML using the `ot` attribute:

```html
<div ot="my-transform" color="blue" size="24">
    <p>Hello from my transform!</p>
</div>
```

File names for `.js` and `.css` don't matter — all files in the folder are automatically loaded. The only requirement is that `demo.html` exists.

## Running the dev server

```bash
node server my-transform
```

Open `http://localhost:3000` to preview your transform.

## Project structure

```
items/                  # All transform items
  typed/                # Example: Typed transform
    typed.js
    typed.css
    demo.html
server/                 # Dev server (do not modify)
  index.js
  back/                 # Server-side (assets, routes, http)
  front/                # Client-side (scan, observe, process)
```

## License

MIT
