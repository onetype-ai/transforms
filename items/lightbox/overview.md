A fullscreen image lightbox with gallery navigation, zoom, and touch support. Click any image to open it in a cinematic overlay with smooth animations.

### Gallery navigation

When multiple images are inside the container, the lightbox becomes a gallery. Navigate with arrow buttons, keyboard arrows, or swipe on touch devices. A counter shows your position in the set. Enable loop mode to cycle endlessly through the gallery.

### Zoom and pan

Scroll to zoom into an image at your cursor position. On mobile, pinch to zoom. Once zoomed, drag to pan around the image. Zoom resets when navigating to another image. The zoom level is capped at 10x to keep things usable.

### Touch gestures

Full mobile support with horizontal swipe to navigate between images, pinch-to-zoom for detail viewing, and drag-to-pan when zoomed in. Swipe detection uses a distance threshold to avoid accidental triggers.

### Keyboard accessible

Full keyboard navigation - left and right arrows to move between images, Escape to close. The dialog element provides native focus trapping so tab stays within the lightbox while it's open.

### High-resolution support

Use the `data-full` attribute on thumbnails to load a higher resolution version in the lightbox. The thumbnail grid stays fast while the lightbox delivers full quality. Adjacent images are preloaded in the background for instant navigation.

### Animated transitions

Opens with a smooth fade animation and closes the same way. The closing animation plays fully before removing the overlay, so there's no abrupt disappearance.
