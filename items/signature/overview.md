Signature pad for capturing handwritten signatures on any website. Powered by signature_pad - smooth, pressure-sensitive drawing with variable-width curves that look like real ink.

### How it works

Drop the transform onto any element and it becomes a drawing canvas. Users sign with mouse or touch, and the strokes render as smooth Bezier curves with natural width variation - thinner on fast strokes, thicker on slow ones. The canvas automatically scales for retina displays so signatures look crisp on any screen.

A placeholder text shows when the pad is empty and disappears as soon as drawing starts. The whole surface is clickable with a crosshair cursor, so it's clear where to sign.

### Toolbar

Built-in buttons for Clear, Undo, and Download sit in the bottom-right corner. Clear wipes the whole pad. Undo removes the last stroke, so users can correct mistakes without starting over. Download exports the signature as a transparent PNG file.

Each button can be toggled individually, or the entire toolbar can be hidden for a minimal look. There's also a Save button that appears when a callback function is provided - it sends the signature data URL to your own handler, useful for form submissions or API calls.

### Customization

The pen color and stroke width range are adjustable. A narrow width range gives clean, consistent lines. A wide range creates more expressive, calligraphy-like strokes. The background color defaults to white but can be changed to match any form design.