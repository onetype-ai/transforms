transforms.ItemAdd({
    id: 'tabs',
    icon: 'tab',
    name: 'Tabs',
    description: 'Accessible tabbed interface with animated indicator, transitions, and autoplay.',
    config: {
        'position': ['string', 'top'],
        'transition': ['string', 'slide'],
        'duration': ['number', 300],
        'autoplay': ['boolean', false],
        'autoplay-duration': ['number', 5000],
        'autoplay-pause': ['boolean', true],
        'indicator': ['string', 'underline'],
        'progress': ['boolean', false],
        'styled': ['boolean', true],
        'active': ['number', 0]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-tabs';
        const position = data['position'];
        const vertical = position === 'left' || position === 'right';
        const uid = Math.random().toString(36).substring(2, 7);

        this.current = data['active'];
        this.triggers = [];
        this.panels = [];

        this.element = (tag, className, parent) =>
        {
            const el = document.createElement(tag);
            el.className = className;
            parent.appendChild(el);
            return el;
        };

        this.parse = () =>
        {
            const children = [...node.children];
            const triggers = [];
            const panels = [];

            for(let i = 0; i < children.length; i += 2)
            {
                triggers.push(children[i]);
                panels.push(children[i + 1]);
            }

            return { triggers, panels };
        };

        this.trigger = (child, index) =>
        {
            const button = this.element('button', prefix + '-trigger', this.triggerWrap);
            const active = index === this.current;

            button.innerHTML = child.innerHTML;
            button.setAttribute('role', 'tab');
            button.setAttribute('id', prefix + '-trigger-' + uid + '-' + index);
            button.setAttribute('aria-controls', prefix + '-panel-' + uid + '-' + index);
            button.setAttribute('aria-selected', active ? 'true' : 'false');
            button.setAttribute('tabindex', active ? '0' : '-1');

            if(active)
            {
                button.classList.add(prefix + '-active');
            }

            return button;
        };

        this.panel = (child, index) =>
        {
            const panel = this.element('div', prefix + '-panel', this.panelWrap);
            const active = index === this.current;

            panel.innerHTML = child.innerHTML;
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('id', prefix + '-panel-' + uid + '-' + index);
            panel.setAttribute('aria-labelledby', prefix + '-trigger-' + uid + '-' + index);

            if(active)
            {
                panel.classList.add(prefix + '-active');
            }

            return panel;
        };

        this.structure = () =>
        {
            const parsed = this.parse();

            node.innerHTML = '';
            node.classList.add(prefix);
            node.classList.add(prefix + '-' + position);

            if(data['styled'])
            {
                node.classList.add(prefix + '-styled');
            }

            if(data['indicator'] !== 'none')
            {
                node.classList.add(prefix + '-' + data['indicator']);
            }

            if(data['transition'] === 'fade')
            {
                node.classList.add(prefix + '-fade');
            }

            this.triggerWrap = this.element('div', prefix + '-triggers', node);
            this.triggerWrap.setAttribute('role', 'tablist');

            parsed.triggers.forEach((child, index) =>
            {
                this.triggers.push(this.trigger(child, index));
            });

            this.indicatorEl = this.element('div', prefix + '-indicator', this.triggerWrap);

            if(data['progress'] && data['autoplay'])
            {
                this.progressBar = this.element('div', prefix + '-progress', node);
                this.progressBar.style.animationDuration = data['autoplay-duration'] + 'ms';
            }

            this.panelWrap = this.element('div', prefix + '-panels', node);
            this.panelWrap.style.setProperty('--duration', data['duration'] + 'ms');

            parsed.panels.forEach((child, index) =>
            {
                this.panels.push(this.panel(child, index));
            });

            this.count = this.triggers.length;
        };

        this.indicator = () =>
        {
            const target = this.triggers[this.current];

            if(vertical)
            {
                this.triggerWrap.style.setProperty('--indicator-top', target.offsetTop + 'px');
                this.triggerWrap.style.setProperty('--indicator-height', target.offsetHeight + 'px');
            }
            else
            {
                this.triggerWrap.style.setProperty('--indicator-left', target.offsetLeft + 'px');
                this.triggerWrap.style.setProperty('--indicator-width', target.offsetWidth + 'px');
            }
        };

        this.activate = (index) =>
        {
            if(index === this.current)
            {
                return;
            }

            const direction = index > this.current ? 1 : -1;
            const axis = vertical ? 'Y' : 'X';

            this.triggers[this.current].classList.remove(prefix + '-active');
            this.triggers[this.current].setAttribute('aria-selected', 'false');
            this.triggers[this.current].setAttribute('tabindex', '-1');

            this.triggers[index].classList.add(prefix + '-active');
            this.triggers[index].setAttribute('aria-selected', 'true');
            this.triggers[index].setAttribute('tabindex', '0');

            this.panels.forEach((panel) =>
            {
                panel.classList.remove(prefix + '-active', prefix + '-leaving');
            });

            this.panels[this.current].classList.add(prefix + '-leaving');
            this.panels[this.current].style.setProperty('--slide', 'translate' + axis + '(' + (direction > 0 ? '-100%' : '100%') + ')');

            const target = this.panels[index];
            target.style.setProperty('--slide', 'translate' + axis + '(' + (direction > 0 ? '100%' : '-100%') + ')');
            target.style.transition = 'none';
            void target.offsetHeight;
            target.style.transition = '';
            target.classList.add(prefix + '-active');

            this.current = index;
            this.indicator();
            this.progress();
        };

        this.keyboard = (e) =>
        {
            const prev = vertical ? 'ArrowUp' : 'ArrowLeft';
            const next = vertical ? 'ArrowDown' : 'ArrowRight';
            let target = -1;

            if(e.key === next)
            {
                target = (this.current + 1) % this.count;
            }
            else if(e.key === prev)
            {
                target = (this.current - 1 + this.count) % this.count;
            }
            else if(e.key === 'Home')
            {
                target = 0;
            }
            else if(e.key === 'End')
            {
                target = this.count - 1;
            }

            if(target === -1)
            {
                return;
            }

            e.preventDefault();
            this.activate(target);
            this.triggers[target].focus();
        };

        this.events = () =>
        {
            this.triggers.forEach((trigger, index) =>
            {
                trigger.addEventListener('click', () => this.activate(index));
            });

            this.triggerWrap.addEventListener('keydown', (e) => this.keyboard(e));
        };

        this.progress = () =>
        {
            if(this.progressBar)
            {
                this.progressBar.style.animation = 'none';
                void this.progressBar.offsetWidth;
                this.progressBar.style.animation = '';
                this.progressBar.style.animationDuration = data['autoplay-duration'] + 'ms';
            }
        };

        this.autoplay = () =>
        {
            if(!data['autoplay'])
            {
                return;
            }

            this.timer = setInterval(() =>
            {
                this.activate((this.current + 1) % this.count);
            }, data['autoplay-duration']);

            if(data['autoplay-pause'])
            {
                node.addEventListener('mouseenter', () => this.pause());
                node.addEventListener('mouseleave', () => this.resume());
            }

            this.progress();
        };

        this.pause = () =>
        {
            clearInterval(this.timer);

            if(this.progressBar)
            {
                this.progressBar.style.animationPlayState = 'paused';
            }
        };

        this.resume = () =>
        {
            this.timer = setInterval(() =>
            {
                this.activate((this.current + 1) % this.count);
            }, data['autoplay-duration']);

            if(this.progressBar)
            {
                this.progress();
            }
        };

        this.build = () =>
        {
            this.structure();
            this.indicator();
            this.events();
            this.autoplay();

            document.fonts.ready.then(() => this.indicator());
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        if(this.timer)
        {
            clearInterval(this.timer);
        }
    }
});
