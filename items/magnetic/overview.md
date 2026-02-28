Element follows the cursor with a magnetic pull effect. Move the mouse near it and the element shifts toward the cursor. Move away and it eases back to its original position.

### How it works

Each magnetic element has an invisible activation zone around it. When the cursor enters that zone, the element starts following the mouse with a configurable pull strength. The closer the cursor gets, the stronger the pull feels. Once the cursor leaves the zone, the element smoothly returns to center.

The effect uses CSS transforms and transitions, so it runs at 60fps with no jank. The return animation uses easing for a natural, elastic feel.

### Use cases

Works great on buttons - adds a subtle interactive feel that makes the page feel more alive. Also works well on circular icon buttons, social links, navigation items, and floating action buttons. Anything small and clickable benefits from the magnetic effect.

### Tuning

The pull strength controls how far the element moves relative to the cursor distance. A low value gives a subtle, gentle drift. A higher value makes the element snap more aggressively toward the mouse. The activation zone radius determines how close the cursor needs to be before the effect kicks in - a larger radius means the element starts reacting from further away.