A horizontal scroll section that converts vertical scrolling into horizontal movement. The section sticks to the viewport while content slides left, then releases when complete.

### How it works

Place your panels as direct children of the element. Each panel becomes a full-viewport-width slide. As the user scrolls vertically, the panels move horizontally from right to left. When the last panel is fully visible, the section unsticks and normal scrolling resumes.

### Sticky viewport

The section uses position sticky to lock itself to the top of the screen. The outer container is set to a calculated height that provides enough scroll distance for the horizontal movement. This creates the illusion that vertical scrolling has paused while content moves sideways.

### Scroll mapping

Vertical scroll progress is mapped directly to horizontal translation. The mapping is linear - scroll 50% of the section and the panels are at the halfway point. The speed setting controls how much vertical scroll distance is needed to complete the horizontal movement. Higher values create a slower, more dramatic effect.

### Panels

Each direct child becomes a panel that fills the full viewport width and height. You control what goes inside each panel - text, images, cards, anything. The panels sit in a flex row and slide as a group.

### Reduced motion

When the user prefers reduced motion, the horizontal scroll effect is disabled entirely. Panels stack vertically as normal sections, ensuring the content remains accessible without any scroll hijacking.
