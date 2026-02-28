Animated number counter powered by CountUp.js. Numbers count up from zero (or any starting value) when they scroll into view - great for stats sections, pricing, dashboards, and anywhere you want numbers to feel alive.

### How it works

Add the transform to any element, set a target number, and it animates from start to end when the element enters the viewport. Uses IntersectionObserver internally so the animation only fires when the user actually sees it.

By default, the counter plays once and stays at the final number. You can also set it to replay every time the element scrolls back into view - useful for landing pages where users scroll up and down.

### Formatting

Numbers can be styled with prefixes and suffixes - dollar signs, percentage marks, "k" for thousands, or any text you want before or after the number. Supports decimal places for precision, and you can customize both the thousands separator and decimal character to match any locale.

### Easing

The default animation uses easing - it starts fast and slows down toward the end, which feels natural and draws attention to the final number. Turn easing off for a steady linear count, which works better for timers or countdowns where a constant speed makes more sense.