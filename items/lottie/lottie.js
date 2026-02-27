transforms.ItemAdd({
    id: 'lottie',
    icon: 'animation',
    name: 'Lottie',
    description: 'Lottie animations from JSON files with playback controls.',
    js: ['https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/build/player/lottie.min.js'],
    config: {
        'path': ['string', ''],
        'loop': ['boolean', true],
        'autoplay': ['boolean', true],
        'speed': ['number', 1],
        'direction': ['number', 1],
        'renderer': ['string', 'svg'],
        'trigger': ['string', 'none'],
        'hover-action': ['string', 'play'],
        'click-action': ['string', 'toggle']
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-lottie';

        if(!data['path'])
        {
            return;
        }

        this.build = () =>
        {
            node.classList.add(prefix);
            node.innerHTML = '';

            const container = document.createElement('div');
            container.className = prefix + '-container';
            node.appendChild(container);

            this.instance = lottie.loadAnimation({
                container: container,
                renderer: data['renderer'],
                loop: data['loop'],
                autoplay: data['trigger'] === 'none' && data['autoplay'],
                path: data['path']
            });

            this.instance.setSpeed(data['speed']);
            this.instance.setDirection(data['direction']);
        };

        this.trigger = () =>
        {
            const trigger = data['trigger'];

            if(trigger === 'scroll')
            {
                this.observer = new IntersectionObserver((entries) =>
                {
                    if(entries[0].isIntersecting)
                    {
                        this.instance.play();
                        if(!data['loop'])
                        {
                            this.observer.disconnect();
                        }
                    }
                    else
                    {
                        this.instance.pause();
                    }
                }, { threshold: 0.2 });
                this.observer.observe(node);
            }
            else if(trigger === 'hover')
            {
                this.instance.pause();

                node.addEventListener('mouseenter', () =>
                {
                    if(data['hover-action'] === 'play')
                    {
                        this.instance.play();
                    }
                    else if(data['hover-action'] === 'reverse')
                    {
                        this.instance.setDirection(1);
                        this.instance.play();
                    }
                });

                node.addEventListener('mouseleave', () =>
                {
                    if(data['hover-action'] === 'play')
                    {
                        this.instance.pause();
                    }
                    else if(data['hover-action'] === 'reverse')
                    {
                        this.instance.setDirection(-1);
                        this.instance.play();
                    }
                });
            }
            else if(trigger === 'click')
            {
                this.instance.pause();
                this.playing = false;

                node.addEventListener('click', () =>
                {
                    if(data['click-action'] === 'toggle')
                    {
                        this.playing = !this.playing;
                        this.playing ? this.instance.play() : this.instance.pause();
                    }
                    else if(data['click-action'] === 'restart')
                    {
                        this.instance.goToAndPlay(0, true);
                    }
                });
            }
        };

        this.build();
        this.trigger();
    },
    destroy: function(data, node, transformer)
    {
        if(this.instance)
        {
            this.instance.destroy();
        }
        if(this.observer)
        {
            this.observer.disconnect();
        }
    }
});
