transforms.ItemAdd({
    id: 'scroll-reveal',
    icon: 'visibility',
    name: 'Scroll Reveal',
    description: 'Animate elements into view on scroll.',
    config: {
        'effect': ['string', 'fade-up'],
        'duration': ['number', 600],
        'delay': ['number', 0],
        'easing': ['string', 'ease'],
        'stagger': ['number', 0],
        'distance': ['number', 40],
        'once': ['boolean', true],
        'threshold': ['number', 0.1]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-scroll-reveal';

        this.targets = () =>
        {
            if(data['stagger'] > 0 && node.children.length > 1)
            {
                return [...node.children];
            }

            return [node];
        };

        this.style = (element, index) =>
        {
            const delay = data['delay'] + (index * data['stagger']);

            element.style.transitionDuration = data['duration'] + 'ms';
            element.style.transitionTimingFunction = data['easing'];
            element.style.transitionDelay = delay + 'ms';
        };

        this.initial = (element) =>
        {
            const effect = data['effect'];
            const distance = data['distance'] + 'px';

            element.classList.add(prefix + '-item');

            if(effect === 'fade-up')
            {
                element.style.opacity = '0';
                element.style.transform = 'translateY(' + distance + ')';
            }
            else if(effect === 'fade-down')
            {
                element.style.opacity = '0';
                element.style.transform = 'translateY(-' + distance + ')';
            }
            else if(effect === 'fade-left')
            {
                element.style.opacity = '0';
                element.style.transform = 'translateX(' + distance + ')';
            }
            else if(effect === 'fade-right')
            {
                element.style.opacity = '0';
                element.style.transform = 'translateX(-' + distance + ')';
            }
            else if(effect === 'fade')
            {
                element.style.opacity = '0';
            }
            else if(effect === 'zoom-in')
            {
                element.style.opacity = '0';
                element.style.transform = 'scale(0.6)';
            }
            else if(effect === 'zoom-out')
            {
                element.style.opacity = '0';
                element.style.transform = 'scale(1.4)';
            }
            else if(effect === 'slide-up')
            {
                element.style.opacity = '0';
                element.style.transform = 'translateY(100%)';
            }
            else if(effect === 'slide-down')
            {
                element.style.opacity = '0';
                element.style.transform = 'translateY(-100%)';
            }
            else if(effect === 'slide-left')
            {
                element.style.opacity = '0';
                element.style.transform = 'translateX(100%)';
            }
            else if(effect === 'slide-right')
            {
                element.style.opacity = '0';
                element.style.transform = 'translateX(-100%)';
            }
            else if(effect === 'flip-up')
            {
                element.style.opacity = '0';
                element.style.transform = 'perspective(600px) rotateX(90deg)';
            }
            else if(effect === 'flip-left')
            {
                element.style.opacity = '0';
                element.style.transform = 'perspective(600px) rotateY(90deg)';
            }
            else
            {
                element.style.opacity = '0';
                element.style.transform = 'translateY(' + distance + ')';
            }
        };

        this.reveal = (element) =>
        {
            element.style.opacity = '1';
            element.style.transform = 'none';
        };

        this.hide = (element) =>
        {
            this.initial(element);
        };

        this.observe = () =>
        {
            this.observer = new IntersectionObserver((entries) =>
            {
                entries.forEach((entry) =>
                {
                    if(entry.isIntersecting)
                    {
                        const targets = this.targets();

                        targets.forEach((element) =>
                        {
                            this.reveal(element);
                        });

                        if(data['once'])
                        {
                            this.observer.disconnect();
                        }
                    }
                    else if(!data['once'])
                    {
                        const targets = this.targets();

                        targets.forEach((element) =>
                        {
                            this.hide(element);
                        });
                    }
                });
            }, { threshold: data['threshold'] });

            this.observer.observe(node);
        };

        this.build = () =>
        {
            const targets = this.targets();

            node.classList.add(prefix);

            targets.forEach((element, index) =>
            {
                this.initial(element);
                this.style(element, index);
            });

            this.observe();
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        if(this.observer)
        {
            this.observer.disconnect();
        }

        const targets = this.targets();

        targets.forEach((element) =>
        {
            element.style.opacity = '';
            element.style.transform = '';
            element.style.transitionDuration = '';
            element.style.transitionTimingFunction = '';
            element.style.transitionDelay = '';
            element.classList.remove('ot-scroll-reveal-item');
        });

        node.classList.remove('ot-scroll-reveal');
    }
});
