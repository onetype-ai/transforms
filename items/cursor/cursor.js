transforms.ItemAdd({
    id: 'cursor',
    icon: 'point_scan',
    name: 'Cursor',
    description: 'Custom cursor with dot, ring, and smooth trailing effect.',
    config: {
        'dot': ['boolean', true],
        'dot-size': ['number', 8],
        'ring': ['boolean', true],
        'ring-size': ['number', 36],
        'ring-width': ['number', 2],
        'color': ['string', ''],
        'speed': ['number', 0.15],
        'hover-scale': ['number', 1.5],
        'hover-targets': ['string', 'a, button, [data-cursor]'],
        'blend': ['boolean', false],
        'hide-default': ['boolean', true]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-cursor';

        this.mouse = { x: 0, y: 0 };
        this.dot = { x: 0, y: 0 };
        this.ring = { x: 0, y: 0 };
        this.hovering = false;
        this.visible = false;

        this.lerp = (a, b, n) =>
        {
            return (1 - n) * a + n * b;
        };

        this.create = () =>
        {
            this.wrapper = document.createElement('div');
            this.wrapper.className = prefix;

            if(data['blend'])
            {
                this.wrapper.classList.add(prefix + '-blend');
            }

            if(data['dot'])
            {
                this.dotEl = document.createElement('div');
                this.dotEl.className = prefix + '-dot';
                this.dotEl.style.width = data['dot-size'] + 'px';
                this.dotEl.style.height = data['dot-size'] + 'px';
                this.dotEl.style.marginLeft = (-data['dot-size'] / 2) + 'px';
                this.dotEl.style.marginTop = (-data['dot-size'] / 2) + 'px';

                if(data['color'])
                {
                    this.dotEl.style.background = data['color'];
                }

                this.wrapper.appendChild(this.dotEl);
            }

            if(data['ring'])
            {
                this.ringEl = document.createElement('div');
                this.ringEl.className = prefix + '-ring';
                this.ringEl.style.width = data['ring-size'] + 'px';
                this.ringEl.style.height = data['ring-size'] + 'px';
                this.ringEl.style.borderWidth = data['ring-width'] + 'px';
                this.ringEl.style.marginLeft = (-data['ring-size'] / 2) + 'px';
                this.ringEl.style.marginTop = (-data['ring-size'] / 2) + 'px';
                this.ringEl.style.setProperty('--hover-scale', data['hover-scale']);

                if(data['color'])
                {
                    this.ringEl.style.borderColor = data['color'];
                }

                this.wrapper.appendChild(this.ringEl);
            }

            node.appendChild(this.wrapper);

            if(data['hide-default'])
            {
                node.style.cursor = 'none';
            }
        };

        this.move = (e) =>
        {
            const rect = node.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;

            if(!this.visible)
            {
                this.visible = true;
                this.wrapper.classList.add(prefix + '-visible');
                this.dot.x = this.mouse.x;
                this.dot.y = this.mouse.y;
                this.ring.x = this.mouse.x;
                this.ring.y = this.mouse.y;
            }
        };

        this.enter = () =>
        {
            this.visible = true;
            this.wrapper.classList.add(prefix + '-visible');
        };

        this.leave = () =>
        {
            this.visible = false;
            this.wrapper.classList.remove(prefix + '-visible');
        };

        this.render = () =>
        {
            if(this.visible)
            {
                this.dot.x = this.lerp(this.dot.x, this.mouse.x, 0.65);
                this.dot.y = this.lerp(this.dot.y, this.mouse.y, 0.65);

                this.ring.x = this.lerp(this.ring.x, this.mouse.x, data['speed']);
                this.ring.y = this.lerp(this.ring.y, this.mouse.y, data['speed']);

                if(this.dotEl)
                {
                    this.dotEl.style.transform = 'translate(' + this.dot.x + 'px, ' + this.dot.y + 'px)';
                }

                if(this.ringEl)
                {
                    this.ringEl.style.left = this.ring.x + 'px';
                    this.ringEl.style.top = this.ring.y + 'px';
                }
            }

            this.raf = requestAnimationFrame(() => this.render());
        };

        this.hover = () =>
        {
            const targets = node.querySelectorAll(data['hover-targets']);

            targets.forEach((target) =>
            {
                target.addEventListener('mouseenter', this.onhoverenter = () =>
                {
                    this.hovering = true;
                    this.wrapper.classList.add(prefix + '-hover');
                });

                target.addEventListener('mouseleave', this.onhoverleave = () =>
                {
                    this.hovering = false;
                    this.wrapper.classList.remove(prefix + '-hover');
                });
            });
        };

        this.events = () =>
        {
            node.addEventListener('mousemove', this.move, { passive: true });
            node.addEventListener('mouseenter', this.enter);
            node.addEventListener('mouseleave', this.leave);
        };

        this.build = () =>
        {
            node.classList.add(prefix + '-area');
            this.create();
            this.events();
            this.hover();
            this.render();
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        if(this.raf)
        {
            cancelAnimationFrame(this.raf);
        }

        if(this.wrapper)
        {
            this.wrapper.remove();
        }

        node.removeEventListener('mousemove', this.move);
        node.removeEventListener('mouseenter', this.enter);
        node.removeEventListener('mouseleave', this.leave);
        node.style.cursor = '';
    }
});
