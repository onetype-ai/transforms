A fully accessible accordion component with smooth height animations. Built for FAQ sections, feature lists, documentation, and anywhere you need collapsible content.

### How it works

Write your content as alternating pairs - a header element followed by a panel element. The accordion restructures them into collapsible sections with proper ARIA attributes, keyboard navigation, and animated expand/collapse transitions.

### Smooth animation

Uses CSS Grid's grid-template-rows transition from 0fr to 1fr for buttery smooth height animation. No JavaScript height calculations, no fixed max-height hacks. The panel expands to its natural content height with a clean easing curve.

### Accessibility

Full WAI-ARIA accordion pattern. Headers are focusable buttons with aria-expanded state. Panels have role="region" with proper labelling. Keyboard navigation supports Arrow Up/Down between headers, Home/End to jump to first/last, and Enter/Space to toggle.

### Modes

By default, only one panel can be open at a time - opening one closes the others. Enable multiple mode to let users open as many panels as they want simultaneously.

### Styled and unstyled

Ships with a clean default style - subtle borders, smooth color transitions on hover, and a plus/minus icon that animates between states. Disable styled mode to strip all visual styling and apply your own design. The animation and accessibility features work either way.
