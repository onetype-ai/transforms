transforms.ItemAdd({
    id: 'particles',
    icon: 'blur_on',
    name: 'Particles',
    description: 'Animated particle backgrounds with presets and mouse interaction.',
    js: ['https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js'],
    config: {
        'preset': ['string', 'stars'],
        'color': ['string', '#ffffff'],
        'count': ['number', 80],
        'speed': ['number', 1],
        'size': ['number', 3],
        'links': ['boolean', false],
        'links-color': ['string', '#ffffff'],
        'hover': ['string', 'none'],
        'click': ['string', 'none'],
        'direction': ['string', 'none'],
        'background': ['string', ''],
        'height': ['number', 400]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-particles';
        const uid = prefix + '-' + Math.random().toString(36).substring(2, 9);

        this.random = (min, max) =>
        {
            return Math.random() * (max - min) + min;
        };

        this.presets = () =>
        {
            const presets = {
                stars: {
                    number: { value: data['count'], density: { enable: true, value_area: 800 } },
                    color: { value: data['color'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.8, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false } },
                    size: { value: data['size'], random: true },
                    line_linked: { enable: false },
                    move: { enable: true, speed: data['speed'], direction: data['direction'], random: true, straight: false, out_mode: 'out' }
                },
                snow: {
                    number: { value: data['count'], density: { enable: true, value_area: 600 } },
                    color: { value: data['color'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.7, random: true },
                    size: { value: data['size'] * 2, random: true },
                    line_linked: { enable: false },
                    move: { enable: true, speed: data['speed'], direction: 'bottom', random: false, straight: false, out_mode: 'out' }
                },
                links: {
                    number: { value: data['count'], density: { enable: true, value_area: 800 } },
                    color: { value: data['color'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5 },
                    size: { value: data['size'], random: true },
                    line_linked: { enable: true, distance: 150, color: data['links-color'], opacity: 0.4, width: 1 },
                    move: { enable: true, speed: data['speed'] * 2, direction: 'none', random: false, straight: false, out_mode: 'bounce' }
                },
                bubbles: {
                    number: { value: Math.max(10, Math.floor(data['count'] / 4)), density: { enable: true, value_area: 800 } },
                    color: { value: data['color'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.2, random: true },
                    size: { value: data['size'] * 30, random: true },
                    line_linked: { enable: false },
                    move: { enable: true, speed: data['speed'] * 0.5, direction: 'top', random: true, straight: false, out_mode: 'out' }
                },
                confetti: {
                    number: { value: data['count'], density: { enable: true, value_area: 600 } },
                    color: { value: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'] },
                    shape: { type: ['circle', 'edge'] },
                    opacity: { value: 0.8, random: true },
                    size: { value: data['size'] * 2, random: true },
                    line_linked: { enable: false },
                    move: { enable: true, speed: data['speed'] * 5, direction: 'bottom', random: true, straight: false, out_mode: 'out' }
                },
                fireflies: {
                    number: { value: Math.max(15, Math.floor(data['count'] / 3)), density: { enable: true, value_area: 800 } },
                    color: { value: data['color'] === '#ffffff' ? '#ffcc00' : data['color'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.6, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0, sync: false } },
                    size: { value: data['size'], random: true },
                    line_linked: { enable: false },
                    move: { enable: true, speed: data['speed'] * 0.5, direction: 'none', random: true, straight: false, out_mode: 'bounce' }
                }
            };

            return presets[data['preset']] || presets.stars;
        };

        this.interaction = () =>
        {
            const events = { onclick: { enable: false }, onhover: { enable: false }, resize: true };

            if(data['hover'] !== 'none')
            {
                events.onhover = { enable: true, mode: data['hover'] };
            }

            if(data['click'] !== 'none')
            {
                events.onclick = { enable: true, mode: data['click'] };
            }

            return {
                detect_on: 'canvas',
                events: events,
                modes: {
                    grab: { distance: 200, line_linked: { opacity: 0.5 } },
                    repulse: { distance: 150, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 },
                    bubble: { distance: 200, size: 20, duration: 2, opacity: 0.8, speed: 3 }
                }
            };
        };

        this.config = () =>
        {
            const particles = this.presets();

            if(data['links'] && !particles.line_linked.enable)
            {
                particles.line_linked = {
                    enable: true,
                    distance: 150,
                    color: data['links-color'],
                    opacity: 0.4,
                    width: 1
                };
            }

            return {
                particles: particles,
                interactivity: this.interaction(),
                retina_detect: true
            };
        };

        this.build = () =>
        {
            node.classList.add(prefix);
            node.style.height = data['height'] + 'px';

            if(data['background'])
            {
                node.style.background = data['background'];
            }

            node.innerHTML = '';

            const container = document.createElement('div');
            container.id = uid;
            container.className = prefix + '-container';
            node.appendChild(container);

            particlesJS(uid, this.config());
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        const container = node.querySelector('[id]');
        if(container && window.pJSDom)
        {
            const index = window.pJSDom.findIndex((p) => p.pJS.canvas.el.parentNode.id === container.id);
            if(index > -1)
            {
                window.pJSDom[index].pJS.fn.vendors.destroypJS();
                window.pJSDom.splice(index, 1);
            }
        }
    }
});
