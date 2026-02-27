Touch-enabled slider powered by Swiper.js. Supports navigation arrows, pagination, autoplay, looping, and multiple transition effects. Works with any content — images, cards, text blocks.

Child elements of the `ot="swiper"` container become individual slides automatically. No extra markup needed.

### Options

- **direction** — "horizontal" or "vertical" (default: "horizontal")
- **slides-per-view** — number of visible slides, or "auto" (default: 1)
- **space-between** — gap between slides in px (default: 0)
- **speed** — transition speed in ms (default: 300)
- **loop** — infinite loop mode (default: false)
- **rewind** — rewind to first/last slide at edges (default: false)
- **effect** — transition effect: "slide", "fade", "cube", "coverflow", "flip", "cards" (default: "slide")
- **autoplay** — enable automatic slide advancement (default: false)
- **autoplay-delay** — delay between slides in ms (default: 3000)
- **autoplay-pause** — pause autoplay on hover (default: false)
- **pagination** — pagination type: "bullets", "fraction", "progressbar" (default: none)
- **navigation** — show prev/next arrows (default: false)
- **scrollbar** — show draggable scrollbar (default: false)
- **centered** — center the active slide (default: false)
- **free-mode** — free scrolling without snapping (default: false)
- **grab-cursor** — show grab cursor on hover (default: false)
- **autoheight** — adjust height to active slide (default: false)
- **slides-per-group** — slides to advance per interaction (default: 1)
- **keyboard** — enable keyboard navigation (default: false)
- **mousewheel** — enable mousewheel navigation (default: false)
- **parallax** — enable parallax effects with data-swiper-parallax attributes (default: false)

### Effect options

- **crossfade** — cross-fade slides in fade effect (default: false)
- **coverflow-depth** — depth offset in px (default: 100)
- **coverflow-rotate** — rotation angle in degrees (default: 50)
- **coverflow-stretch** — stretch space between slides (default: 0)
- **coverflow-scale** — slide scale (default: 1)
- **cards-offset** — offset per slide in px (default: 8)
- **cards-rotate** — enable card rotation (default: true)
