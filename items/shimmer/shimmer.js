transforms.ItemAdd({
    id: 'shimmer',
    icon: 'auto_awesome',
    name: 'Shimmer',
    description: 'Animated light sweep across text.',
    config: {
        'color': ['string', 'rgba(156, 156, 156, 1)'],
        'highlight': ['string', 'rgba(255, 255, 255, 1)'],
        'duration': ['number', 2],
        'angle': ['number', 90],
        'spread': ['number', 140],
        'trigger': ['string', 'loop']
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-shimmer';

        this.gradient = () =>
        {
            const color = data['color'];
            const highlight = data['highlight'];
            const spread = data['spread'];
            return 'linear-gradient(90deg, '
                + color + ' 0%, '
                + color + ' calc(50% - ' + spread + 'px), '
                + highlight + ' 50%, '
                + color + ' calc(50% + ' + spread + 'px), '
                + color + ' 100%)';
        };

        this.apply = () =>
        {
            node.classList.add(prefix);
            node.style.backgroundImage = this.gradient();
            node.style.backgroundSize = '200% 100%';
            node.style.backgroundClip = 'text';
            node.style.webkitBackgroundClip = 'text';
            node.style.webkitTextFillColor = 'transparent';
        };

        this.loop = () =>
        {
            node.classList.add(prefix + '-loop');
            node.style.animationDuration = data['duration'] + 's';
        };

        this.hover = () =>
        {
            node.classList.add(prefix + '-hover');
            node.style.setProperty('--shimmer-duration', data['duration'] + 's');
        };

        this.scroll = () =>
        {
            node.classList.add(prefix + '-scroll');
            node.style.animationDuration = data['duration'] + 's';

            this.observer = new IntersectionObserver((entries) =>
            {
                if(entries[0].isIntersecting)
                {
                    node.classList.add(prefix + '-active');
                    this.observer.disconnect();
                }
            }, { threshold: 0.1 });

            this.observer.observe(node);
        };

        this.build = () =>
        {
            this.apply();

            if(data['trigger'] === 'hover')
            {
                this.hover();
            }
            else if(data['trigger'] === 'scroll')
            {
                this.scroll();
            }
            else
            {
                this.loop();
            }
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        if(this.observer)
        {
            this.observer.disconnect();
        }

        const prefix = 'ot-shimmer';

        node.classList.remove(prefix, prefix + '-loop', prefix + '-hover', prefix + '-scroll', prefix + '-active');
        node.style.backgroundImage = '';
        node.style.backgroundSize = '';
        node.style.backgroundClip = '';
        node.style.webkitBackgroundClip = '';
        node.style.webkitTextFillColor = '';
        node.style.animationDuration = '';
        node.style.removeProperty('--shimmer-duration');
    }
});
