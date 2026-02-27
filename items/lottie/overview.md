Render Lottie animations from JSON files. Powered by lottie-web, the official Airbnb library for After Effects animations on the web.

Point to any Lottie JSON URL and get a smooth, scalable, lightweight animation. Supports SVG, Canvas, and HTML renderers. Control playback with scroll, hover, or click triggers.

### Options

- **path** — URL to the Lottie JSON file (required)
- **loop** — loop the animation (default: true)
- **autoplay** — start playing on load (default: true)
- **speed** — playback speed, 1 is normal (default: 1)
- **direction** — 1 for forward, -1 for reverse (default: 1)
- **renderer** — rendering engine: "svg", "canvas", or "html" (default: "svg")
- **trigger** — playback trigger: "none", "scroll", "hover", or "click" (default: "none")
- **hover-action** — what happens on hover: "play" or "reverse" (default: "play")
- **click-action** — what happens on click: "toggle" or "restart" (default: "toggle")
