transforms.ItemAdd({
    id: 'anime',
    icon: 'animation',
    name: 'Anime',
    description: 'Scroll-triggered animations powered by Anime.js.',
    js: ['https://cdn.jsdelivr.net/npm/animejs@4.3.6/dist/bundles/anime.umd.min.js'],
    config: {
        'effect': ['string', 'fade-up'],
        'duration': ['number', 800],
        'delay': ['number', 0],
        'ease': ['string', 'outExpo'],
        'stagger': ['number', 0],
        'translate-x': ['number', 0],
        'translate-y': ['number', 0],
        'rotate': ['number', 0],
        'scale': ['number', 0],
        'once': ['boolean', true]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-anime';
        const { animate, stagger } = anime;

        this.presets = {
            'fade-up': { opacity: { from: 0, to: 1 }, y: { from: 60, to: 0 } },
            'fade-down': { opacity: { from: 0, to: 1 }, y: { from: -60, to: 0 } },
            'fade-left': { opacity: { from: 0, to: 1 }, x: { from: 60, to: 0 } },
            'fade-right': { opacity: { from: 0, to: 1 }, x: { from: -60, to: 0 } },
            'zoom-in': { opacity: { from: 0, to: 1 }, scale: { from: 0.5, to: 1 } },
            'zoom-out': { opacity: { from: 0, to: 1 }, scale: { from: 1.5, to: 1 } },
            'flip-up': { opacity: { from: 0, to: 1 }, rotateX: { from: 90, to: 0 } },
            'flip-left': { opacity: { from: 0, to: 1 }, rotateY: { from: 90, to: 0 } },
            'slide-up': { opacity: { from: 0, to: 1 }, y: { from: '100%', to: '0%' } },
            'slide-down': { opacity: { from: 0, to: 1 }, y: { from: '-100%', to: '0%' } },
            'slide-left': { opacity: { from: 0, to: 1 }, x: { from: '100%', to: '0%' } },
            'slide-right': { opacity: { from: 0, to: 1 }, x: { from: '-100%', to: '0%' } },
            'bounce': { opacity: { from: 0, to: 1 }, scale: [{ from: 0, to: 1.15, duration: 400 }, { to: 1, ease: 'outBounce', duration: 600 }] },
            'rotate-in': { opacity: { from: 0, to: 1 }, rotate: { from: '1turn', to: 0 }, scale: { from: 0.3, to: 1 } },
            'blur-in': { opacity: { from: 0, to: 1 }, filter: { from: 'blur(20px)', to: 'blur(0px)' } }
        };

        this.custom = () =>
        {
            const properties = {};
            let has = false;

            if(data['translate-x'] !== 0)
            {
                properties.x = { from: data['translate-x'], to: 0 };
                has = true;
            }

            if(data['translate-y'] !== 0)
            {
                properties.y = { from: data['translate-y'], to: 0 };
                has = true;
            }

            if(data['rotate'] !== 0)
            {
                properties.rotate = { from: data['rotate'], to: 0 };
                has = true;
            }

            if(data['scale'] !== 0)
            {
                properties.scale = { from: data['scale'], to: 1 };
                has = true;
            }

            if(has)
            {
                properties.opacity = { from: 0, to: 1 };
            }

            return has ? properties : null;
        };

        this.properties = () =>
        {
            const custom = this.custom();

            if(custom)
            {
                return custom;
            }

            return this.presets[data['effect']] || this.presets['fade-up'];
        };

        this.targets = () =>
        {
            if(data['stagger'] > 0 && node.children.length > 1)
            {
                return [...node.children];
            }

            return node;
        };

        this.create = () =>
        {
            const targets = this.targets();
            const properties = this.properties();
            const params = Object.assign({}, properties);

            params.duration = data['duration'];
            params.ease = data['ease'];
            params.autoplay = false;

            if(data['delay'] > 0)
            {
                params.delay = data['delay'];
            }

            if(data['stagger'] > 0 && Array.isArray(targets))
            {
                params.delay = stagger(data['stagger']);
            }

            this.animation = animate(targets, params);
        };

        this.observe = () =>
        {
            this.observer = new IntersectionObserver((entries) =>
            {
                if(entries[0].isIntersecting)
                {
                    if(data['once'])
                    {
                        this.observer.disconnect();
                    }

                    this.animation.play();
                }
            }, { threshold: 0.1 });

            this.observer.observe(node);
        };

        this.build = () =>
        {
            node.classList.add(prefix);

            if(data['stagger'] > 0 && node.children.length > 1)
            {
                node.style.overflow = 'hidden';
            }

            this.create();
            this.observe();
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        if(this.observer)
        {
            this.observer.disconnect();
        }

        if(this.animation)
        {
            this.animation.revert();
        }
    }
});
