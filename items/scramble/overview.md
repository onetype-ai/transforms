Text decode effect that reveals text through randomized characters. Characters scramble rapidly while the real text is revealed one letter at a time from left to right.

Supports multiple strings that cycle with the same decode effect. Triggered on scroll by default.

### Options

- **speed** — ms per character revealed (default: 50)
- **scramble-speed** — ms between random character refreshes (default: 30)
- **delay** — delay before animation starts in ms (default: 0)
- **back-delay** — pause between strings in ms (default: 1500)
- **loop** — repeat through strings (default: true)
- **chars** — character set for scrambling (default: A-Z, a-z, 0-9)
- **trigger** — when to start: 'scroll' or 'load' (default: scroll)
