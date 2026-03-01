A table of contents that builds itself from headings on your page and tracks the reader's scroll position in real time.

### How it works

Drop the element anywhere alongside your content. It scans sibling headings (h2 and h3 by default), generates a linked navigation list, and highlights the current section as the user scrolls. Click any link to smooth-scroll straight to that heading.

### Scroll tracking

Uses IntersectionObserver to detect which heading is currently in view - no scroll event spam, no layout thrashing. The active state updates instantly as headings cross into the top third of the viewport. An animated marker slides along the left edge to give a clear visual indicator of position.

### Nested headings

Heading hierarchy is preserved visually. An h3 that follows an h2 gets indented automatically, reflecting the document structure without any extra markup. You control which heading levels to include through the selector option.

### Smooth scrolling

Clicking a link scrolls the page smoothly to the target heading. If your page has a sticky header, set an offset value and the scroll position accounts for it - no content hidden behind navigation.

### Styled and unstyled

Ships with a clean sidebar style - subtle left border, brand-colored marker, hover states, and proper spacing. Turn off styled mode to strip all visuals and build your own design on top. The scroll tracking and accessibility features work regardless.

### Accessibility

The navigation uses a nav element with an aria-label. The currently active link gets aria-current for screen readers. All links are standard anchor tags with proper href values, so keyboard navigation works out of the box.
