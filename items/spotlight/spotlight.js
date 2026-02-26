transforms.ItemAdd({
    id: 'spotlight',
    icon: 'highlight',
    name: 'Spotlight',
    description: 'Cursor-following spotlight that reveals content through a dark overlay.',
    config: {
        'size': ['number', 200],
        'border': ['number', 100],
        'strength': ['number', 0.85],
        'color': ['string', '0, 0, 0']
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-spotlight';
        const inner = data['size'];
        const outer = inner + data['border'];

        this.build = () =>
        {
            node.classList.add(prefix);

            this.overlay = document.createElement('div');
            this.overlay.className = prefix + '-overlay';
            this.overlay.style.background = 'rgba(' + data['color'] + ', ' + data['strength'] + ')';
            this.overlay.style.opacity = '0';
            node.appendChild(this.overlay);
        };

        this.move = (e) =>
        {
            const rect = node.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.overlay.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, transparent ' + inner + 'px, rgba(' + data['color'] + ', ' + data['strength'] + ') ' + outer + 'px)';
        };

        this.events = () =>
        {
            node.addEventListener('mouseenter', () =>
            {
                this.overlay.style.opacity = '1';
            });

            node.addEventListener('mousemove', this.move);

            node.addEventListener('mouseleave', () =>
            {
                this.overlay.style.opacity = '0';
            });
        };

        this.build();
        this.events();
    }
});
