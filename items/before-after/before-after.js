transforms.ItemAdd({
    id: 'before-after',
    icon: 'compare',
    name: 'Before After',
    description: 'Image comparison slider to reveal before and after images.',
    config: {
        'position': ['number', 50],
        'direction': ['string', 'horizontal'],
        'label-before': ['string', ''],
        'label-after': ['string', ''],
        'hover': ['boolean', false]
    },
    code: function(data, node, transformer)
    {
        const vertical = data['direction'] === 'vertical';
        const prefix = 'ot-before-after';
        const side = vertical ? 'top' : 'left';
        const arrows = vertical ? 'M7 10l5-5 5 5M7 14l5 5 5-5' : 'M10 7l-5 5 5 5M14 7l5 5-5 5';
        const axis = vertical ? 'clientY' : 'clientX';
        const dimension = vertical ? 'height' : 'width';
        const rect = vertical ? 'top' : 'left';

        this.element = (tag, className, parent) =>
        {
            const element = document.createElement(tag);
            element.className = className;
            parent.appendChild(element);
            return element;
        };

        this.label = (text, modifier, parent) =>
        {
            if(!text)
            {
                return;
            }
            const label = this.element('span', prefix + '-label ' + prefix + '-label-' + modifier, parent);
            label.textContent = text;
        };

        this.clip = (value) =>
        {
            const invert = (100 - value) + '%';
            return vertical
                ? 'inset(0 0 ' + invert + ' 0)'
                : 'inset(0 ' + invert + ' 0 0)';
        };

        this.update = (value) =>
        {
            this.top.style.clipPath = this.clip(value);
            this.line.style[side] = value + '%';
            this.handle.style[side] = value + '%';
        };

        this.build = () =>
        {
            const images = node.querySelectorAll('img');
            if(images.length < 2)
            {
                return;
            }

            const before = images[0].cloneNode(true);
            const after = images[1].cloneNode(true);

            node.innerHTML = '';
            node.classList.add(prefix);
            if(vertical)
            {
                node.classList.add(prefix + '-vertical');
            }

            const wrapper = this.element('div', prefix + '-wrapper', node);

            this.element('div', prefix + '-bottom', wrapper).appendChild(after);
            this.top = this.element('div', prefix + '-top', wrapper);
            this.top.appendChild(before);

            this.line = this.element('div', prefix + '-line', wrapper);
            this.handle = this.element('div', prefix + '-handle', wrapper);
            this.handle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="' + arrows + '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

            const input = this.element('input', prefix + '-input', wrapper);
            input.type = 'range';
            input.min = 0;
            input.max = 100;
            input.value = data['position'];
            input.setAttribute('aria-label', 'Image comparison slider');

            this.label(data['label-before'], 'before', wrapper);
            this.label(data['label-after'], 'after', wrapper);

            this.update(data['position']);
            this.events(input);
        };

        this.events = (input) =>
        {
            input.addEventListener('input', (e) => this.update(e.target.value));

            if(!data['hover'])
            {
                return;
            }

            node.addEventListener('mousemove', (e) =>
            {
                const bounds = node.getBoundingClientRect();
                const ratio = (e[axis] - bounds[rect]) / bounds[dimension];
                const value = Math.max(0, Math.min(100, ratio * 100));
                input.value = value;
                this.update(value);
            });
        };

        this.build();
    }
});
