Typewriter text animation that cycles through multiple strings with realistic typing and deleting effects. Place strings as child elements and the transform handles the rest.

Supports smart backspacing — when consecutive strings share a common prefix, only the differing part is deleted and retyped. Inline pauses let you add dramatic timing with `^1000` syntax inside any string.

### Options

- **speed** — typing speed in ms per character (default: 50)
- **back-speed** — deleting speed in ms per character (default: 30)
- **back-delay** — pause before deleting in ms (default: 1000)
- **start-delay** — delay before animation starts in ms (default: 0)
- **loop** — repeat the animation (default: true)
- **cursor** — show blinking cursor (default: true)
- **cursor-char** — cursor character (default: |)
- **smart-backspace** — only delete differing characters (default: true)
- **shuffle** — randomize string order (default: false)
