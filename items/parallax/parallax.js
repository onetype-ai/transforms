transforms.ItemAdd({
    id: 'parallax',
    icon: 'layers',
    name: 'Parallax',
    description: 'Elements scroll at different speeds for depth.',
    config: {
        'speed': ['number', -3],
        'direction': ['string', 'vertical'],
        'mobile': ['boolean', false]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-parallax';

        this.reduced = () =>
        {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        };

        this.mobile = () =>
        {
            return window.innerWidth <= 768;
        };

        this.enabled = () =>
        {
            if(this.reduced())
            {
                return false;
            }

            if(this.mobile() && !data['mobile'])
            {
                return false;
            }

            return true;
        };

        this.update = () =>
        {
            const rect = node.parentElement.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const viewport = window.innerHeight / 2;
            const distance = (center - viewport) * (data['speed'] / 50);

            if(data['direction'] === 'horizontal')
            {
                node.style.transform = 'translate3d(' + distance + 'px, 0, 0)';
            }
            else
            {
                node.style.transform = 'translate3d(0, ' + distance + 'px, 0)';
            }
        };

        this.scroll = () =>
        {
            if(this.ticking)
            {
                return;
            }

            this.ticking = true;

            requestAnimationFrame(() =>
            {
                this.update();
                this.ticking = false;
            });
        };

        this.build = () =>
        {
            if(!this.enabled())
            {
                return;
            }

            node.classList.add(prefix);
            this.update();

            this.handler = () => this.scroll();
            window.addEventListener('scroll', this.handler, { passive: true });
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        if(this.handler)
        {
            window.removeEventListener('scroll', this.handler);
        }

        node.classList.remove('ot-parallax');
        node.style.transform = '';
    }
});
