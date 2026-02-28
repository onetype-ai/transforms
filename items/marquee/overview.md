Infinite scrolling marquee for logos, text, testimonials, and any content. Pure CSS animation - lightweight, smooth, and GPU-accelerated. No external dependencies.

### How it works

Put any elements inside the container and they scroll infinitely in a seamless loop. The content is automatically duplicated behind the scenes to fill the visible area, so it always looks continuous no matter how wide or narrow the screen is.

The animation runs on CSS transforms, which means it stays smooth at 60fps and doesn't block the main thread. Respects `prefers-reduced-motion` by pausing automatically for users who have reduced motion enabled.

### Directions

Scrolls left by default, but can go right, up, or down. Horizontal is the most common for logo bars and text tickers. Vertical works well for feature lists, news feeds, or sidebar content where you want items cycling through a fixed-height container.

### Fade and pause

Edge fading creates a gradient mask on both sides so content doesn't appear to start or stop abruptly - it fades in and out smoothly. Pause on hover stops the animation when users mouse over it, giving them time to read or interact with the content.

### Use cases

Logo bars showing client or partner brands. Bold text tickers for announcements and promotions. Testimonial cards scrolling horizontally. Feature lists cycling vertically. Works with any HTML - images, cards, badges, icons, or plain text.