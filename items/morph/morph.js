transforms.ItemAdd({
    id: 'morph',
    icon: 'motion_photos_auto',
    name: 'Morph',
    description: 'Smooth SVG shape morphing between multiple paths.',
    js: ['https://cdn.jsdelivr.net/npm/flubber@0.4.2/build/flubber.min.js'],
    config: {
        'trigger': ['string', 'auto'],
        'duration': ['number', 800],
        'pause': ['number', 1500],
        'ease': ['string', 'ease-in-out'],
        'loop': ['boolean', true],
        'fill': ['string', ''],
        'stroke': ['string', ''],
        'stroke-width': ['number', 0]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-morph';

        this.paths = () =>
        {
            const elements = node.querySelectorAll('path');
            const result = [];

            for(let i = 0; i < elements.length; i++)
            {
                result.push(elements[i].getAttribute('d'));
            }

            return result;
        };

        this.easing = (t) =>
        {
            const map = {
                'linear': t,
                'ease-in': t * t,
                'ease-out': t * (2 - t),
                'ease-in-out': t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
            };

            return map[data['ease']] !== undefined ? map[data['ease']] : map['ease-in-out'];
        };

        this.animate = (from, to, callback) =>
        {
            const interpolator = flubber.interpolate(from, to, { maxSegmentLength: 8 });
            const start = performance.now();
            const duration = data['duration'];

            const frame = (now) =>
            {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = this.easing(progress);

                this.display.setAttribute('d', interpolator(eased));

                if(progress < 1)
                {
                    this.raf = requestAnimationFrame(frame);
                }
                else if(callback)
                {
                    callback();
                }
            };

            this.raf = requestAnimationFrame(frame);
        };

        this.next = () =>
        {
            const from = this.index;
            this.index = (this.index + 1) % this.shapes.length;

            this.animate(this.shapes[from], this.shapes[this.index], () =>
            {
                if(data['trigger'] === 'auto' && data['loop'])
                {
                    this.timeout = setTimeout(() => this.next(), data['pause']);
                }
                else if(data['trigger'] === 'auto' && !data['loop'] && this.index !== 0)
                {
                    this.timeout = setTimeout(() => this.next(), data['pause']);
                }
            });
        };

        this.auto = () =>
        {
            this.timeout = setTimeout(() => this.next(), data['pause']);
        };

        this.hover = () =>
        {
            node.addEventListener('mouseenter', this.onenter = () =>
            {
                if(this.raf)
                {
                    cancelAnimationFrame(this.raf);
                }

                this.animate(this.shapes[0], this.shapes[1]);
            });

            node.addEventListener('mouseleave', this.onleave = () =>
            {
                if(this.raf)
                {
                    cancelAnimationFrame(this.raf);
                }

                this.animate(this.shapes[1], this.shapes[0]);
            });
        };

        this.click = () =>
        {
            node.addEventListener('click', this.onclick = () =>
            {
                if(this.raf)
                {
                    cancelAnimationFrame(this.raf);
                }

                this.next();
            });
        };

        this.scroll = () =>
        {
            this.observer = new IntersectionObserver((entries) =>
            {
                if(entries[0].isIntersecting)
                {
                    this.next();

                    if(!data['loop'])
                    {
                        this.observer.disconnect();
                    }
                }
            }, { threshold: 0.3 });

            this.observer.observe(node);
        };

        this.build = () =>
        {
            this.shapes = this.paths();

            if(this.shapes.length < 2)
            {
                return;
            }

            node.classList.add(prefix);
            this.index = 0;

            const svg = node.querySelector('svg');
            const first = svg.querySelector('path');
            const fill = data['fill'] || first.getAttribute('fill') || 'currentColor';
            const stroke = data['stroke'] || first.getAttribute('stroke') || '';
            const strokeWidth = data['stroke-width'] || parseFloat(first.getAttribute('stroke-width')) || 0;

            svg.innerHTML = '';

            this.display = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this.display.setAttribute('d', this.shapes[0]);
            this.display.setAttribute('fill', fill);

            if(stroke)
            {
                this.display.setAttribute('stroke', stroke);
            }

            if(strokeWidth > 0)
            {
                this.display.setAttribute('stroke-width', strokeWidth);
            }

            svg.appendChild(this.display);

            const trigger = data['trigger'];

            if(trigger === 'auto')
            {
                this.auto();
            }
            else if(trigger === 'hover')
            {
                this.hover();
            }
            else if(trigger === 'click')
            {
                this.click();
            }
            else if(trigger === 'scroll')
            {
                this.scroll();
            }
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        if(this.raf)
        {
            cancelAnimationFrame(this.raf);
        }

        if(this.timeout)
        {
            clearTimeout(this.timeout);
        }

        if(this.observer)
        {
            this.observer.disconnect();
        }

        if(this.onenter)
        {
            node.removeEventListener('mouseenter', this.onenter);
        }

        if(this.onleave)
        {
            node.removeEventListener('mouseleave', this.onleave);
        }

        if(this.onclick)
        {
            node.removeEventListener('click', this.onclick);
        }
    }
});
