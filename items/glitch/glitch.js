transforms.ItemAdd({
    id: 'glitch',
    icon: 'electric_bolt',
    name: 'Glitch',
    description: 'Digital distortion with RGB channel splitting.',
    config: {
        'intensity': ['number', 3],
        'duration': ['number', 0.3],
        'trigger': ['string', 'constant'],
        'interval': ['number', 3],
        'color-1': ['string', '#00ffff'],
        'color-2': ['string', '#ff00de']
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-glitch';

        this.setup = () =>
        {
            const text = node.textContent.trim();

            node.setAttribute('data-text', text);
            node.classList.add(prefix);
            node.style.setProperty('--glitch-intensity', data['intensity'] + 'px');
            node.style.setProperty('--glitch-duration', data['duration'] + 's');
            node.style.setProperty('--glitch-color-1', data['color-1']);
            node.style.setProperty('--glitch-color-2', data['color-2']);
        };

        this.constant = () =>
        {
            node.classList.add(prefix + '-active');
        };

        this.hover = () =>
        {
            node.classList.add(prefix + '-hover');
        };

        this.burst = () =>
        {
            node.classList.add(prefix + '-active');

            this.timeout = setTimeout(() =>
            {
                node.classList.remove(prefix + '-active');
            }, data['duration'] * 1000 * 6);
        };

        this.loop = () =>
        {
            this.burst();

            this.timer = setInterval(() =>
            {
                this.burst();
            }, data['interval'] * 1000);
        };

        this.build = () =>
        {
            this.setup();

            if(data['trigger'] === 'hover')
            {
                this.hover();
            }
            else if(data['trigger'] === 'interval')
            {
                this.loop();
            }
            else
            {
                this.constant();
            }
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        const prefix = 'ot-glitch';

        if(this.timer)
        {
            clearInterval(this.timer);
        }

        if(this.timeout)
        {
            clearTimeout(this.timeout);
        }

        node.removeAttribute('data-text');
        node.classList.remove(prefix, prefix + '-active', prefix + '-hover');
        node.style.removeProperty('--glitch-intensity');
        node.style.removeProperty('--glitch-duration');
        node.style.removeProperty('--glitch-color-1');
        node.style.removeProperty('--glitch-color-2');
    }
});
