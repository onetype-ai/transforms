Material Design ripple effect on click. A circle expands outward from where you clicked and fades away, giving instant visual feedback that something was pressed.

### How it works

Click anywhere on the element and a circular wave radiates from that exact point. The ripple scales up to cover the full element, then fades out. The whole animation is smooth and runs on CSS keyframes, so there's no jank even on low-end devices.

The ripple spawns from the actual click position by default, which feels natural because the feedback starts right where your finger or cursor is. There's also a centered mode that always starts from the middle - useful for icon buttons or small elements where position doesn't matter as much.

### Styling

The ripple color defaults to `currentColor`, so it automatically matches the text color of the element. Override it with any color value for custom effects - white ripples on dark buttons, blue ripples on neutral backgrounds, whatever fits the design.

### Use cases

Works on buttons, cards, list items, navigation links, tabs - any element that responds to clicks. It's the same interaction pattern used in Android and Google's Material Design system, so users already understand it intuitively. Adds a polished, tactile feel to any clickable surface.