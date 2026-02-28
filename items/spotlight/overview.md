Cursor-following spotlight that reveals content through a dark overlay. Move the mouse over the element and everything dims except a bright circle that tracks the cursor.

### How it works

When the cursor enters the element, a dark overlay fades in. A radial gradient punches a transparent hole around the cursor position, creating a flashlight effect. As the cursor moves, the spotlight follows in real time using a CSS radial gradient that repositions on every mouse move.

The overlay fades out smoothly when the cursor leaves, restoring the full content. The effect is purely visual - content underneath remains fully clickable and interactive.

### Spotlight shape

The spotlight has two parts - a fully transparent inner circle and a soft gradient border that transitions to the dark overlay. A large inner radius with a wide border creates a soft, ambient glow. A small inner radius with a tight border creates a focused beam that forces exploration.

### Use cases

Works great on cards to create an interactive reveal effect. On images, it turns a photo into something you explore with your cursor - perfect for before/after reveals or hidden details. On text blocks, it creates a reading-light effect. Can also be used for easter eggs or gamified content where users have to search for something hidden under the overlay.