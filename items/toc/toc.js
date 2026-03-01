transforms.ItemAdd({
    id: 'toc',
    icon: 'toc',
    name: 'Table of Contents',
    description: 'Auto-generated table of contents with scroll-tracking active state.',
    config: {
        'selector': ['string', 'h2, h3'],
        'scope': ['string', ''],
        'offset': ['number', 0],
        'smooth': ['boolean', true],
        'styled': ['boolean', true],
        'marker': ['boolean', true]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-toc';

        this.links = [];
        this.headings = [];
        this.active = -1;

        this.scope = () =>
        {
            if(data['scope'])
            {
                const container = document.querySelector(data['scope']);

                if(!container)
                {
                    return [];
                }

                return [...container.querySelectorAll(data['selector'])];
            }

            let parent = node.parentElement;

            while(parent && parent !== document.body)
            {
                const headings = [...parent.querySelectorAll(data['selector'])];
                const found = headings.filter((el) =>
                {
                    return parent.contains(el) && !node.contains(el);
                });

                if(found.length > 0)
                {
                    return found;
                }

                parent = parent.parentElement;
            }

            return [];
        };

        this.id = (heading, index) =>
        {
            if(!heading.id)
            {
                heading.id = prefix + '-heading-' + index;
            }

            return heading.id;
        };

        this.level = (heading) =>
        {
            return parseInt(heading.tagName.charAt(1));
        };

        this.nav = () =>
        {
            const nav = document.createElement('nav');
            nav.className = prefix + '-nav';
            nav.setAttribute('aria-label', 'Table of Contents');
            return nav;
        };

        this.list = (headings) =>
        {
            let base = 6;

            for(let i = 0; i < headings.length; i++)
            {
                const lvl = this.level(headings[i]);

                if(lvl < base)
                {
                    base = lvl;
                }
            }

            const ul = document.createElement('ul');
            ul.className = prefix + '-list';

            for(let i = 0; i < headings.length; i++)
            {
                const heading = headings[i];
                const depth = this.level(heading) - base;
                const id = this.id(heading, i);

                const li = document.createElement('li');
                li.className = prefix + '-item';
                li.style.setProperty('--depth', depth);

                const link = document.createElement('a');
                link.className = prefix + '-link';
                link.href = '#' + id;
                link.textContent = heading.textContent;
                link.setAttribute('data-index', i);

                li.appendChild(link);
                ul.appendChild(li);

                this.links.push(link);
            }

            return ul;
        };

        this.click = (e) =>
        {
            if(!data['smooth'])
            {
                return;
            }

            const link = e.target.closest('.' + prefix + '-link');

            if(!link)
            {
                return;
            }

            e.preventDefault();

            const index = parseInt(link.getAttribute('data-index'));
            const heading = this.headings[index];

            if(!heading)
            {
                return;
            }

            const top = heading.getBoundingClientRect().top + window.scrollY - data['offset'];

            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        };

        this.highlight = (index) =>
        {
            if(index === this.active)
            {
                return;
            }

            if(this.active >= 0 && this.links[this.active])
            {
                this.links[this.active].classList.remove(prefix + '-active');
                this.links[this.active].removeAttribute('aria-current');
            }

            this.active = index;

            if(index >= 0 && this.links[index])
            {
                this.links[index].classList.add(prefix + '-active');
                this.links[index].setAttribute('aria-current', 'true');
            }

            if(data['marker'] && this.markerEl && index >= 0 && this.links[index])
            {
                const link = this.links[index];
                const nav = this.navEl.getBoundingClientRect();
                const rect = link.getBoundingClientRect();

                this.markerEl.style.top = (rect.top - nav.top) + 'px';
                this.markerEl.style.height = rect.height + 'px';
                this.markerEl.style.opacity = '1';
            }
        };

        this.track = () =>
        {
            const offset = data['offset'];
            const threshold = 200;
            let current = -1;

            for(let i = 0; i < this.headings.length; i++)
            {
                const rect = this.headings[i].getBoundingClientRect();

                if(rect.top <= threshold + offset)
                {
                    current = i;
                }
            }

            if(current === -1 && this.headings.length > 0)
            {
                current = 0;
            }

            this.highlight(current);
        };

        this.listen = () =>
        {
            this.onscroll = () => this.track();
            window.addEventListener('scroll', this.onscroll, { passive: true });
            this.track();
        };

        this.build = () =>
        {
            this.headings = this.scope();

            if(this.headings.length === 0)
            {
                return;
            }

            node.classList.add(prefix);

            if(data['styled'])
            {
                node.classList.add(prefix + '-styled');
            }

            this.navEl = this.nav();
            this.navEl.appendChild(this.list(this.headings));

            if(data['marker'])
            {
                this.markerEl = document.createElement('div');
                this.markerEl.className = prefix + '-marker';
                this.navEl.appendChild(this.markerEl);
            }

            node.appendChild(this.navEl);
            this.navEl.addEventListener('click', (e) => this.click(e));

            this.listen();
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        if(this.onscroll)
        {
            window.removeEventListener('scroll', this.onscroll);
        }

        node.innerHTML = '';
    }
});
