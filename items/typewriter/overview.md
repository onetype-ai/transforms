Typewriter text animation that cycles through multiple strings with realistic typing and deleting effects. Place strings as child elements and the transform handles the rest.

### Smart backspace

When consecutive strings share a common prefix, only the differing part is deleted and retyped. "I love apples" followed by "I love oranges" only retypes from "apples" onward - just like a real person would edit.

### Inline pauses

Add dramatic timing with `^1000` syntax inside any string. The number is the pause duration in milliseconds. "Loading^1000... done!" types "Loading", pauses for a second, then finishes. Stack multiple pauses anywhere in the text for precise control over timing.

### Cursor

A blinking cursor follows the text by default, completing the typewriter illusion. Customize the cursor character or hide it entirely for a cleaner look.

### Looping and shuffle

With looping enabled, the animation cycles through all strings continuously - great for rotating taglines, job titles, or feature highlights. Enable shuffle to randomize the order on each cycle.
