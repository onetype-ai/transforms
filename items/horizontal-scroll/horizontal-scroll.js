transforms.ItemAdd({
    id: 'horizontal-scroll',
    icon: 'swipe_left',
    name: 'Horizontal Scroll',
    description: 'Scroll vertically to move content horizontally with a sticky viewport effect.',
    config: {
        'speed': ['number', 1],
        'gap': ['number', 0]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-horizontal-scroll';

        this.create = () =>
        {
            const panels = Array.from(node.children);
            this.count = panels.length;

            node.classList.add(prefix);

            this.viewport = document.createElement('div');
            this.viewport.className = prefix + '-viewport';

            this.track = document.createElement('div');
            this.track.className = prefix + '-track';
            this.track.style.gap = data['gap'] + 'px';

            panels.forEach((panel) =>
            {
                panel.classList.add(prefix + '-panel');
                this.track.appendChild(panel);
            });

            this.viewport.appendChild(this.track);
            node.appendChild(this.viewport);
        };

        this.measure = () =>
        {
            this.viewport.style.transform = '';

            const trackWidth = this.track.scrollWidth;
            const viewWidth = this.viewport.offsetWidth;
            const viewHeight = this.viewport.offsetHeight;

            this.distance = trackWidth - viewWidth;
            this.height = this.distance * data['speed'] + viewHeight;
            this.viewportHeight = viewHeight;

            node.style.height = this.height + 'px';
        };

        this.scroll = () =>
        {
            const rect = node.getBoundingClientRect();
            const total = this.height - this.viewportHeight;
            const scrolled = Math.max(0, -rect.top);
            const progress = Math.min(1, scrolled / total);

            this.viewport.style.transform = 'translateY(' + Math.min(scrolled, total) + 'px)';
            this.track.style.transform = 'translateX(' + (-progress * this.distance) + 'px)';
        };

        this.events = () =>
        {
            window.addEventListener('scroll', this.onscroll = () =>
            {
                requestAnimationFrame(this.scroll);
            }, { passive: true });

            window.addEventListener('resize', this.onresize = () =>
            {
                this.measure();
                this.scroll();
            });
        };

        this.build = () =>
        {
            this.create();
            this.measure();
            this.events();
            this.scroll();
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        window.removeEventListener('scroll', this.onscroll);
        window.removeEventListener('resize', this.onresize);
    }
});
