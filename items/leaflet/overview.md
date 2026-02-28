Interactive map powered by Leaflet.js. Supports multiple tile styles, custom markers with emoji icons, and HTML popups. No API key required.

Add markers as child elements with `lat` and `lng` attributes. Use the `popup` attribute for click-to-open info bubbles. Emoji or HTML content inside the child becomes the marker icon — leave empty for the default pin.

### Tile styles

- **streets** — OpenStreetMap standard
- **light** — CartoDB Positron, clean minimalist
- **dark** — CartoDB DarkMatter, dark mode
- **voyager** — CartoDB Voyager, modern with colors
- **satellite** — Esri WorldImagery, aerial photography
- **topo** — OpenTopoMap, topographic with elevation

### Options

- **lat** — center latitude (default: 48.2082)
- **lng** — center longitude (default: 16.3738)
- **zoom** — initial zoom level 1-19 (default: 13)
- **style** — tile style name (default: "streets")
- **height** — map height in pixels (default: 400)
- **zoom-control** — show zoom buttons (default: true)
- **scroll-zoom** — enable scroll wheel zoom (default: true)
- **dragging** — enable map panning (default: true)
- **max-zoom** — maximum zoom level (default: 19)
- **min-zoom** — minimum zoom level (default: 1)
