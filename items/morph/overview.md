Smooth SVG shape morphing powered by Flubber. Drop in your SVG paths and watch them fluidly transform from one shape to another.

### How it works

Place multiple `<path>` elements inside an SVG. Morph reads all the path data, replaces them with a single display path, and animates between each shape in sequence. Flubber handles the hard part - matching points between completely different shapes so the transitions always look smooth, even when morphing a star into a circle or a triangle into a hexagon.

### Triggers

Four ways to trigger the morph animation:

- **Auto** - cycles through all shapes automatically with a configurable pause between each transition
- **Hover** - morphs to the second shape on mouse enter, reverts on mouse leave
- **Click** - advances to the next shape on each click
- **Scroll** - morphs when the element enters the viewport

### Styling

Control the appearance through configuration. Set fill color, stroke color, and stroke width to match your design. Works with CSS variables for easy theming. Leave fill empty and add a stroke for outlined shapes, or combine both for a bordered fill look.

### Use cases

Icon transitions - morph a play icon into pause, a hamburger into a close X, or a heart into a star. Abstract background shapes that shift on scroll. Interactive illustrations that respond to user actions. Loading states that cycle through geometric forms.

### Technical details

Uses Flubber for path interpolation, which automatically handles mismatched path commands and point counts. Animations run on requestAnimationFrame for smooth 60fps performance. Built-in easing functions give natural-feeling motion without external animation libraries.
