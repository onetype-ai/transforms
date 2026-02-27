transforms.ItemAdd({
    id: 'particles',
    icon: 'blur_on',
    name: 'Particles',
    description: 'Animated particle backgrounds with presets and mouse interaction.',
    js: ['https://cdn.jsdelivr.net/npm/tsparticles@3.9.1/tsparticles.bundle.min.js'],
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
        'height': ['number', 400],
        'custom': ['string', '']
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-particles';
        const uid = prefix + '-' + Math.random().toString(36).substring(2, 9);

        this.presets = {
            stars: {
                particles: {
                    number: { value: data['count'] },
                    color: { value: data['color'] },
                    shape: { type: 'circle' },
                    opacity: { value: { min: 0.1, max: 1 }, animation: { enable: true, speed: 0.5, minimumValue: 0.1 } },
                    size: { value: { min: 0.5, max: data['size'] } },
                    move: { enable: true, speed: data['speed'], direction: data['direction'], outModes: 'out' }
                }
            },
            snow: {
                particles: {
                    number: { value: data['count'] },
                    color: { value: data['color'] },
                    shape: { type: 'circle' },
                    opacity: { value: { min: 0.3, max: 1 } },
                    size: { value: { min: 1, max: data['size'] * 2 } },
                    move: { enable: true, speed: data['speed'], direction: 'bottom', straight: false, outModes: 'out' },
                    wobble: { enable: true, distance: 10, speed: 10 }
                }
            },
            links: {
                particles: {
                    number: { value: data['count'] },
                    color: { value: data['color'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5 },
                    size: { value: { min: 1, max: data['size'] } },
                    links: { enable: true, distance: 150, color: data['links-color'], opacity: 0.4, width: 1 },
                    move: { enable: true, speed: data['speed'] * 2, outModes: 'bounce' }
                }
            },
            bubbles: {
                particles: {
                    number: { value: Math.max(10, Math.floor(data['count'] / 4)) },
                    color: { value: data['color'] },
                    shape: { type: 'circle' },
                    opacity: { value: { min: 0.05, max: 0.3 } },
                    size: { value: { min: 20, max: data['size'] * 30 } },
                    move: { enable: true, speed: data['speed'] * 0.5, direction: 'top', outModes: 'out' }
                }
            },
            confetti: {
                particles: {
                    number: { value: 0 },
                    color: { value: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'] },
                    shape: { type: ['circle', 'square'] },
                    opacity: { value: { min: 0.5, max: 1 }, animation: { enable: true, speed: 1, minimumValue: 0 } },
                    size: { value: { min: 3, max: 7 } },
                    move: { enable: true, speed: { min: 10, max: 30 }, direction: 'bottom', gravity: { enable: true, acceleration: 5 }, outModes: { default: 'destroy', top: 'none' }, decay: 0.05 },
                    rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 60 } },
                    tilt: { enable: true, value: { min: 0, max: 360 }, animation: { enable: true, speed: 60 } },
                    wobble: { enable: true, distance: 30, speed: 15 },
                    life: { duration: { value: 5 }, count: 1 }
                },
                emitters: {
                    position: { x: 50, y: 0 },
                    rate: { quantity: 5, delay: 0.15 },
                    size: { width: 100, height: 0 }
                }
            },
            fireflies: {
                particles: {
                    number: { value: Math.max(15, Math.floor(data['count'] / 3)) },
                    color: { value: data['color'] === '#ffffff' ? '#ffcc00' : data['color'] },
                    shape: { type: 'circle' },
                    opacity: { value: { min: 0, max: 0.8 }, animation: { enable: true, speed: 0.5, minimumValue: 0 } },
                    size: { value: { min: 1, max: data['size'] } },
                    move: { enable: true, speed: data['speed'] * 0.5, direction: 'none', random: true, outModes: 'bounce' }
                }
            }
        };

        this.options = () =>
        {
            if(data['custom'])
            {
                try
                {
                    return onetype.Function(data['custom']);
                }
                catch(e)
                {
                    return {};
                }
            }

            const preset = this.presets[data['preset']] || this.presets.stars;
            const config = JSON.parse(JSON.stringify(preset));

            if(data['links'] && !config.particles.links)
            {
                config.particles.links = {
                    enable: true,
                    distance: 150,
                    color: data['links-color'],
                    opacity: 0.4,
                    width: 1
                };
            }

            this.interaction(config);
            this.bg(config);

            config.detectRetina = true;
            config.fpsLimit = 60;

            return config;
        };

        this.interaction = (config) =>
        {
            config.interactivity = { events: {} };

            if(data['hover'] !== 'none')
            {
                config.interactivity.events.onHover = {
                    enable: true,
                    mode: data['hover']
                };
            }

            if(data['click'] !== 'none')
            {
                config.interactivity.events.onClick = {
                    enable: true,
                    mode: data['click']
                };
            }

            config.interactivity.modes = {
                grab: { distance: 200, links: { opacity: 0.5 } },
                repulse: { distance: 150 },
                push: { quantity: 4 },
                remove: { quantity: 2 },
                bubble: { distance: 200, size: 20, duration: 2, opacity: 0.8 }
            };
        };

        this.bg = (config) =>
        {
            if(data['background'])
            {
                config.background = { color: data['background'] };
            }
        };

        this.build = () =>
        {
            node.classList.add(prefix);
            node.style.height = data['height'] + 'px';
            node.innerHTML = '';

            const container = document.createElement('div');
            container.id = uid;
            container.className = prefix + '-container';
            node.appendChild(container);

            tsParticles.load({
                id: uid,
                options: this.options()
            });
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        const container = node.querySelector('[id]');
        if(container && tsParticles)
        {
            const instance = tsParticles.dom().find((c) => c.id === container.id);
            if(instance)
            {
                instance.destroy();
            }
        }
    }
});
