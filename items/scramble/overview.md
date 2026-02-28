Text decode effect that reveals text through randomized characters. Letters scramble rapidly while the real text appears one character at a time from left to right - like a cipher being cracked in real time.

### How it works

The element starts filled with random characters that refresh constantly, creating that classic hacker-terminal look. Then the actual text gets revealed letter by letter from the start. Each revealed character locks in place while the remaining ones keep scrambling. The effect finishes when every character has been decoded.

Triggered on scroll by default, so the animation plays when the element enters the viewport. Can also be set to start immediately on page load.

### Multiple strings

Put multiple child elements inside and the transform cycles through them, decoding each one in sequence. After revealing a string, it pauses briefly, then scrambles again into the next one. With looping enabled, it cycles continuously - great for rotating taglines, status messages, or feature highlights.

### Character sets

The scramble characters default to the full alphabet plus numbers. Swap in a custom set for different aesthetics - binary (01) for a matrix look, numbers only for countdowns, symbols for something more abstract. The character set completely changes the visual feel of the effect.

### Timing

Two independent speeds control the look. The reveal speed determines how fast real characters lock into place. The scramble speed controls how rapidly the random characters refresh. A fast scramble with a slow reveal creates dramatic tension. Equal speeds feel more mechanical and immediate.