Animated light sweep across text creating a metallic shine or glint effect. A gradient highlight moves across the text surface, achieved entirely with CSS using background-clip text and animated background-position. No dependencies, no canvas, no JavaScript animation loop - pure CSS keyframes on a GPU-composited property.

### Trigger modes

Three ways to activate the shimmer:

- **Loop** - continuous animation that repeats forever, perfect for hero headlines and attention-grabbing CTAs
- **Hover** - the shimmer plays once when the user hovers over the text, great for navigation links and interactive elements
- **Scroll** - fires a single shimmer when the element enters the viewport, ideal for section headings on landing pages

### Custom colors

The base text color and highlight color are fully configurable. Use the default white-on-gray for a classic metallic look, warm golds for luxury branding, cool blues for tech aesthetics, or any color combination that fits the design.

### How it works

A linear gradient with a bright highlight band is applied as the text background using background-clip text. The gradient is sized larger than the element (250% width), and a CSS keyframe animation moves the background-position from one end to the other. Since background-position is composited on the GPU, the animation runs at 60fps with zero layout or paint cost.

The spread controls how wide the highlight band is, and the angle controls the direction of the sweep. Duration sets how fast the light moves across the text.

### Accessibility

Respects the prefers-reduced-motion media query. When reduced motion is preferred, the shimmer is disabled and text displays with a static gradient position.
