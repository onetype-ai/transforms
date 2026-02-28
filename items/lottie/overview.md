Play Lottie animations from JSON files. Powered by lottie-web, the official Airbnb library for rendering After Effects animations on the web.

### How it works

Point to any Lottie JSON URL and get a smooth, scalable animation that renders as SVG by default. Lottie files are tiny compared to video or GIF - a complex animation might be just 20-50KB. They scale to any size without losing quality, which makes them perfect for icons, illustrations, loading states, and hero sections.

### Triggers

By default, animations autoplay and loop continuously. But you can control when they start with three different trigger modes.

Scroll trigger plays the animation when it enters the viewport - good for illustrations that should animate as the user scrolls down. Hover trigger starts the animation when the mouse enters the element, with two modes: play (starts on enter, pauses on leave) and reverse (plays forward on enter, plays backward on leave). Click trigger lets users tap to toggle playback or restart the animation from the beginning.

### Playback

Speed and direction can be adjusted independently. Slow an animation down to half speed for a more relaxed feel, or double it for energy. Reverse direction plays the whole animation backward, which works surprisingly well for some transitions.

### Renderers

SVG is the default and best for most cases - sharp at any size, accessible, and lightweight. Canvas is available for performance-heavy animations with lots of layers. HTML renderer is an option but rarely needed.