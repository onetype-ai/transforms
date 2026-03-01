A custom cursor that replaces the default pointer with a smooth, animated dot and ring combination. Perfect for portfolio sites, creative agencies, and interactive experiences.

### Dot and ring

The cursor is made of two elements - a small dot that follows closely and a larger ring that trails behind with a smooth easing delay. The offset between the two creates a fluid, organic feel. Either element can be disabled independently.

### Smooth following

Uses linear interpolation (lerp) on every animation frame to create buttery smooth cursor movement. The dot tracks faster than the ring, giving that characteristic trailing effect. Speed is configurable - lower values create a lazier, more dramatic trail.

### Hover effects

When the cursor enters interactive elements like links and buttons, the ring scales up to draw attention. The hover targets and scale amount are both configurable. Add the data-cursor attribute to any element to make it a hover target.

### Blend mode

Enable blend mode and the cursor inverts colors as it passes over content. Uses mix-blend-mode: difference for a striking visual effect that works on any background.

### Scoped to element

The cursor effect is scoped to the element it is applied to. The default cursor is hidden inside that element and restored outside. Multiple cursor instances can coexist on the same page with different settings.
