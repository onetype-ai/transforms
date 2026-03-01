transforms.ItemAdd({
    id: 'accordion',
    icon: 'expand_circle_down',
    name: 'Accordion',
    description: 'Accessible accordion with smooth height animation and keyboard navigation.',
    config: {
        'multiple': ['boolean', false],
        'active': ['number', -1],
        'duration': ['number', 300],
        'icon': ['boolean', true],
        'styled': ['boolean', true]
    },
    css: [],
    code: function(data, node, transformer)
    {
        const prefix = 'ot-accordion';
        const uid = Math.random().toString(36).substring(2, 7);

        this.items = [];

        this.parse = () =>
        {
            const children = [...node.children];
            const items = [];

            for(let i = 0; i < children.length; i += 2)
            {
                items.push({
                    header: children[i],
                    panel: children[i + 1]
                });
            }

            return items;
        };

        this.element = (tag, className, parent) =>
        {
            const el = document.createElement(tag);
            el.className = className;
            parent.appendChild(el);
            return el;
        };

        this.item = (parsed, index) =>
        {
            const active = index === data['active'];
            const wrapper = this.element('div', prefix + '-item', node);

            if(active)
            {
                wrapper.classList.add(prefix + '-open');
            }

            const header = this.element('button', prefix + '-header', wrapper);
            header.innerHTML = parsed.header.innerHTML;
            header.setAttribute('id', prefix + '-header-' + uid + '-' + index);
            header.setAttribute('aria-expanded', active ? 'true' : 'false');
            header.setAttribute('aria-controls', prefix + '-panel-' + uid + '-' + index);

            if(data['icon'])
            {
                const icon = this.element('span', prefix + '-icon', header);
                icon.setAttribute('aria-hidden', 'true');
            }

            const region = this.element('div', prefix + '-region', wrapper);
            region.style.setProperty('--duration', data['duration'] + 'ms');

            const panel = this.element('div', prefix + '-panel', region);
            const content = this.element('div', prefix + '-content', panel);
            content.innerHTML = parsed.panel.innerHTML;
            panel.setAttribute('id', prefix + '-panel-' + uid + '-' + index);
            panel.setAttribute('role', 'region');
            panel.setAttribute('aria-labelledby', prefix + '-header-' + uid + '-' + index);

            return { wrapper, header, region, panel };
        };

        this.toggle = (index) =>
        {
            const item = this.items[index];
            const open = item.wrapper.classList.contains(prefix + '-open');

            if(!data['multiple'] && !open)
            {
                for(let i = 0; i < this.items.length; i++)
                {
                    if(i !== index)
                    {
                        this.close(i);
                    }
                }
            }

            if(open)
            {
                this.close(index);
            }
            else
            {
                this.open(index);
            }
        };

        this.open = (index) =>
        {
            const item = this.items[index];
            item.wrapper.classList.add(prefix + '-open');
            item.header.setAttribute('aria-expanded', 'true');
        };

        this.close = (index) =>
        {
            const item = this.items[index];
            item.wrapper.classList.remove(prefix + '-open');
            item.header.setAttribute('aria-expanded', 'false');
        };

        this.keyboard = (e) =>
        {
            const headers = this.items.map(item => item.header);
            const index = headers.indexOf(e.target);

            if(index === -1)
            {
                return;
            }

            let target = -1;

            if(e.key === 'ArrowDown')
            {
                target = (index + 1) % this.items.length;
            }
            else if(e.key === 'ArrowUp')
            {
                target = (index - 1 + this.items.length) % this.items.length;
            }
            else if(e.key === 'Home')
            {
                target = 0;
            }
            else if(e.key === 'End')
            {
                target = this.items.length - 1;
            }

            if(target === -1)
            {
                return;
            }

            e.preventDefault();
            headers[target].focus();
        };

        this.events = () =>
        {
            this.items.forEach((item, index) =>
            {
                item.header.addEventListener('click', () => this.toggle(index));
            });

            node.addEventListener('keydown', (e) => this.keyboard(e));
        };

        this.build = () =>
        {
            const parsed = this.parse();

            node.innerHTML = '';
            node.classList.add(prefix);

            if(data['styled'])
            {
                node.classList.add(prefix + '-styled');
            }

            parsed.forEach((item, index) =>
            {
                this.items.push(this.item(item, index));
            });

            this.events();
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        node.innerHTML = '';
    }
});
