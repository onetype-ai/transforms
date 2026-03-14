Multi-layer depth effect where elements scroll at different speeds relative to the viewport. Each element gets a speed multiplier that controls how fast or slow it moves compared to normal scrolling. Negative values make elements lag behind the scroll (background feel), creating the classic parallax depth effect used on nearly every award-winning website.

### How it works

Uses requestAnimationFrame to calculate each element's position relative to the viewport center on every frame. The distance from center is multiplied by the speed factor and applied as a CSS translate3d transform - fully GPU-accelerated with zero layout or paint cost. An IntersectionObserver ensures the animation loop only runs while the element is visible, so off-screen elements have zero runtime cost.

### Speed values

The speed value controls the parallax intensity. Recommended range is -10 to 10:

- **Negative values** - element scrolls slower than the page, creating a background/depth feel
- **Positive values** - element scrolls faster than the page, creating a foreground effect
- **Zero** - no parallax, element scrolls normally

Lower absolute values like -2 or -3 produce subtle, elegant movement. Higher values like -6 or -8 create more dramatic separation between layers. Combine multiple elements with different speeds for a layered depth scene.

### Direction

Supports both vertical and horizontal parallax. Vertical is the default and works with normal page scrolling. Horizontal mode shifts elements sideways as you scroll down - useful for decorative elements and creative layouts.

### Accessibility

Parallax can cause vestibular discomfort including dizziness and motion sickness. The transform respects prefers-reduced-motion and disables all movement when a user has requested reduced motion. On mobile devices, parallax is disabled by default since touch scrolling combined with parallax is a common trigger for vestibular issues. Enable it explicitly with the mobile config if needed.
