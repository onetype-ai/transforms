Fully accessible tabbed interface with animated indicator, smooth content transitions, and autoplay. Works in all four positions - top, bottom, left, and right.

### How it works

Alternate between tab labels and tab content as direct children. The first child is the label for the first tab, the second is its content, the third is the label for the second tab, and so on. The transform handles all the ARIA roles, states, and keyboard navigation automatically.

### Indicator

A sliding indicator follows the active tab. Two built-in styles - underline draws a colored line along the active tab edge, background highlights the active tab with a subtle filled shape. Both animate smoothly between tabs. Set to none if you want no indicator at all.

### Transitions

Content switches with either a slide or fade animation. Slide moves panels in the direction of navigation - left to right or up and down depending on tab position. Fade cross-dissolves between panels. Both respect the configured duration.

### Autoplay

Tabs can cycle automatically with a configurable interval. A progress bar shows how long until the next switch. Hovering pauses the timer so users can read without rushing. Good for testimonial carousels, feature showcases, or onboarding flows.

### Unstyled mode

Turn off default styling to build your own tab design from scratch. The transform still handles all the logic - switching, keyboard nav, ARIA, indicator positioning - but applies no visual CSS. Style the trigger and panel classes however you want.