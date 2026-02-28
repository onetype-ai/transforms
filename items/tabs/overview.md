A fully accessible tabbed interface with animated indicator, smooth content transitions, and autoplay support. Works in all four positions — top, bottom, left, and right.

## Features

- **Sliding indicator** that smoothly transitions between tabs (underline or background style)
- **Content transitions** with slide or fade animations
- **Autoplay** with configurable duration, pause on hover, and optional progress bar
- **Four positions** — top, bottom, left, right
- **Keyboard navigation** — arrow keys, Home, End
- **Full ARIA support** — roles, states, and focus management
- **Unstyled mode** — disable default styling and bring your own CSS

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| position | string | top | Tab placement: top, bottom, left, right |
| transition | string | slide | Panel transition: slide, fade |
| duration | number | 300 | Transition duration in milliseconds |
| indicator | string | underline | Indicator style: underline, background, none |
| autoplay | boolean | false | Auto-advance through tabs |
| autoplay-duration | number | 5000 | Time between auto-switches in ms |
| autoplay-pause | boolean | true | Pause autoplay on hover |
| progress | boolean | false | Show progress bar during autoplay |
| styled | boolean | true | Apply default visual styling |
| active | number | 0 | Initially active tab (0-based index) |

## Structure

Alternate between tab labels and tab content as direct children:

The first child is the label for the first tab, the second child is the content for the first tab, the third child is the label for the second tab, and so on.
