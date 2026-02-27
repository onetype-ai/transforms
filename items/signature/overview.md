Signature pad for capturing handwritten signatures on any website. Powered by signature_pad — smooth, pressure-sensitive drawing with variable-width Bézier curves.

Draw with mouse or touch, undo strokes, clear the pad, and download as PNG. The canvas automatically scales for retina displays. Use the save callback to send signature data to your own function.

### Options

- **color** — pen color as hex (default: "#000000")
- **width-min** — minimum stroke width in pixels (default: 0.5)
- **width-max** — maximum stroke width in pixels (default: 2.5)
- **background** — canvas background color as hex (default: "#ffffff")
- **height** — pad height in pixels (default: 200)
- **placeholder** — text shown when empty (default: "Sign here")
- **buttons** — show toolbar with action buttons (default: true)
- **undo** — show undo button (default: true)
- **download** — show download button (default: true)
- **on-save** — callback function that receives the signature data URL on save (default: none)
