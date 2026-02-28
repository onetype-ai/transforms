Split text into individual letters or words, then animate each piece with a staggered delay. Creates those cinematic text reveal effects you see on portfolio sites and hero sections.

### How it works

The transform takes the text content of the element, breaks it into pieces (letters or words), wraps each one in a span, and animates them in sequence. The original text is preserved in an `aria-label` so screen readers still read it normally.

Triggered on scroll by default - the animation plays when the text enters the viewport. Can also start immediately on page load.

### Animations

Four built-in animation styles. Fade-up is the default and most popular - each piece fades in while sliding upward. Fade-down does the opposite, dropping letters in from above. Plain fade just animates opacity without any movement. Scale pops each letter in from zero size, which looks great on bold headings.

### Split modes

Letter mode breaks text into individual characters. Every letter gets its own animation, creating a fluid wave-like reveal. Works best on short headings and titles.

Word mode splits on spaces instead. Each word animates as a unit, which feels more readable on longer sentences. Great for subheadings, taglines, and paragraph introductions where you want emphasis without overwhelming the reader.

### Timing

The delay between each piece controls how fast the wave moves through the text. Short delays create a rapid cascade, longer delays add dramatic tension. The duration controls how long each individual piece takes to finish its animation.