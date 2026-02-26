transforms.ItemAdd({
    id: 'split',
    icon: 'text_fields',
    name: 'Split',
    description: 'Split text into letters or words with staggered animation.',
    config: {
        'mode': ['string', 'letters'],
        'animation': ['string', 'fade-up'],
        'delay': ['number', 50],
        'duration': ['number', 400],
        'easing': ['string', 'ease'],
        'trigger': ['string', 'scroll']
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-split';
        const text = node.textContent.trim();

        this.span = (content, index) =>
        {
            const element = document.createElement('span');
            element.className = prefix + '-item';
            element.style.setProperty('--index', index);
            element.style.animationDuration = data['duration'] + 'ms';
            element.style.animationDelay = (index * data['delay']) + 'ms';
            element.style.animationTimingFunction = data['easing'];
            element.textContent = content;
            element.setAttribute('aria-hidden', 'true');
            return element;
        };

        this.split = () =>
        {
            if(data['mode'] === 'words')
            {
                return text.split(/\s+/);
            }
            return [...text];
        };

        this.animate = () =>
        {
            node.classList.add(prefix + '-active');
        };

        this.build = () =>
        {
            const pieces = this.split();

            node.innerHTML = '';
            node.classList.add(prefix);
            node.classList.add(prefix + '-' + data['animation']);
            node.setAttribute('aria-label', text);

            pieces.forEach((piece, index) =>
            {
                node.appendChild(this.span(piece, index));

                if(data['mode'] === 'words' && index < pieces.length - 1)
                {
                    const space = document.createElement('span');
                    space.className = prefix + '-space';
                    space.textContent = ' ';
                    space.setAttribute('aria-hidden', 'true');
                    node.appendChild(space);
                }
            });

            if(data['trigger'] === 'scroll')
            {
                this.observer = new IntersectionObserver((entries) =>
                {
                    if(entries[0].isIntersecting)
                    {
                        this.observer.disconnect();
                        this.animate();
                    }
                }, { threshold: 0.1 });
                this.observer.observe(node);
            }
            else
            {
                this.animate();
            }
        };

        this.build();
    }
});
