Digital distortion effect that applies RGB channel splitting, horizontal clipping bands, and positional shaking to text. Two pseudo-element layers duplicate the text content with opposing color shifts - cyan on one side, magenta on the other - while animated clip-path slices reveal random horizontal fragments, creating the look of a corrupted digital signal.

### How it works

The element gets a `data-text` attribute automatically. Two pseudo-elements (`::before` and `::after`) render copies of the text using `content: attr(data-text)`, positioned directly on top of the original. Each pseudo-element applies a colored text-shadow in opposite directions for chromatic aberration, and animated `clip-path: inset()` values rapidly change which horizontal slice is visible. The main element itself shakes with small translate transforms.

### Trigger modes

Three ways to activate the glitch:

- **Constant** - runs continuously, ideal for hero headlines and attention-grabbing headings
- **Hover** - fires only when the user hovers over the text, perfect for navigation links and interactive elements
- **Interval** - glitch bursts fire periodically with calm moments in between, creating a broken transmission effect

### Customization

The intensity controls how far the RGB channels separate and how much the text shakes. Higher values create more aggressive distortion. The two color channels default to cyan and magenta but can be set to any color combination - red and green for a retro CRT look, yellow and blue for a different aesthetic.

### Accessibility

Respects the prefers-reduced-motion media query. When reduced motion is preferred, all animations are disabled and the text displays normally without distortion.
