Scroll-triggered animations powered by Anime.js. Add it to any element and it animates into view as the user scrolls down the page.

### Built-in effects

Comes with 15 animation presets out of the box:

- **Fade** - fade-up, fade-down, fade-left, fade-right
- **Zoom** - zoom-in, zoom-out
- **Flip** - flip-up, flip-left (3D perspective)
- **Slide** - slide-up, slide-down, slide-left, slide-right
- **Special** - bounce, rotate-in, blur-in

The default effect is fade-up, which works well for most content. Just switch the preset name to try a different animation style.

### Stagger

Instead of animating a whole container at once, stagger mode animates each child element one by one with a cascading delay. Great for card grids, stat rows, image galleries, navigation items - anything where you want that sequential reveal effect.

### Custom animations

Don't want to use a preset? Set your own translate, rotate, and scale values to build a completely custom entrance animation. Combine horizontal movement with rotation, scale something in while sliding it sideways - whatever fits the design.

### How it works

Uses IntersectionObserver to detect when elements enter the viewport, so animations only fire when they're actually visible. Runs at 60fps through Anime.js. Can be set to animate once or replay every time the element scrolls back into view.