Animate any element into view as the user scrolls down the page. Add one attribute to any element and it will fade, slide, zoom, or flip into view when it enters the viewport. No dependencies, no configuration files - just clean, GPU-accelerated CSS transitions triggered by IntersectionObserver.

### Effects

Scroll Reveal ships with 13 built-in effects across four categories:

- **Fade** - fade-up, fade-down, fade-left, fade-right, and a simple fade
- **Slide** - slide-up, slide-down, slide-left, slide-right (full-distance movement)
- **Zoom** - zoom-in and zoom-out with scale transforms
- **Flip** - flip-up and flip-left using 3D perspective rotation

The default effect is fade-up, which works naturally for most content. Switch to any other effect with a single attribute.

### Stagger

When placed on a parent element, stagger mode animates each child one by one with a cascading delay between them. Cards appear sequentially, stats reveal left to right, testimonials drop in one after another. The stagger value controls the millisecond gap between each child's entrance.

### How it works

Uses IntersectionObserver to detect when elements enter the viewport. All animations are CSS transitions on opacity and transform - both GPU-composited properties that run at 60fps without triggering layout or paint. The threshold controls how much of the element must be visible before the animation fires.

By default, elements animate once and stay visible. Set once to false and elements will animate out when they leave the viewport and back in when they return - useful for long scrolling pages where you want repeated visual feedback.

### Accessibility

Respects the prefers-reduced-motion media query. When a user has requested reduced motion in their system settings, all animations are disabled and elements appear immediately without any transition.
