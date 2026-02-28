3D tilt effect that follows the cursor on hover. The element rotates toward the mouse position with perspective depth, creating a realistic 3D card effect. Works on any element - cards, images, buttons, entire sections.

### How it works

As the cursor moves over the element, it calculates the position relative to the center and applies a CSS 3D transform. The rotation angle is proportional to how far the cursor is from the center, so the effect feels natural and responsive. On mouse leave, the element smoothly transitions back to its original position.

### Glare

Enable the glare option to add a light reflection overlay that follows the cursor. The glare is a gradient that rotates based on cursor angle, simulating how light would reflect off a tilted surface. Control the intensity with glare opacity - subtle at 0.2, dramatic at 0.5.

### Scale

A slight scale increase on hover adds depth to the interaction. The default 1.05x is barely noticeable but makes the element feel like it lifts off the page. Combine with stronger tilt angles for more dramatic effects.
