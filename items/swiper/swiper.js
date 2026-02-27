transforms.ItemAdd({
    id: 'swiper',
    icon: 'swipe',
    name: 'Swiper',
    description: 'Touch-enabled slider with navigation, pagination, effects and autoplay.',
    js: ['https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js'],
    css: ['https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css'],
    config: {
        'direction': ['string', 'horizontal'],
        'slides-per-view': ['string', '1'],
        'space-between': ['number', 0],
        'speed': ['number', 300],
        'loop': ['boolean', false],
        'rewind': ['boolean', false],
        'effect': ['string', 'slide'],
        'autoplay': ['boolean', false],
        'autoplay-delay': ['number', 3000],
        'autoplay-pause': ['boolean', false],
        'pagination': ['string', ''],
        'navigation': ['boolean', false],
        'scrollbar': ['boolean', false],
        'centered': ['boolean', false],
        'free-mode': ['boolean', false],
        'grab-cursor': ['boolean', false],
        'autoheight': ['boolean', false],
        'slides-per-group': ['number', 1],
        'keyboard': ['boolean', false],
        'mousewheel': ['boolean', false],
        'parallax': ['boolean', false],
        'coverflow-depth': ['number', 100],
        'coverflow-rotate': ['number', 50],
        'coverflow-stretch': ['number', 0],
        'coverflow-scale': ['number', 1],
        'crossfade': ['boolean', false],
        'cards-offset': ['number', 8],
        'cards-rotate': ['boolean', true]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-swiper';

        this.structure = () =>
        {
            const slides = [...node.children];
            if(slides.length === 0)
            {
                return;
            }

            node.classList.add(prefix);
            node.classList.add('swiper');

            const wrapper = document.createElement('div');
            wrapper.className = 'swiper-wrapper';

            slides.forEach((child) =>
            {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.appendChild(child);
                wrapper.appendChild(slide);
            });

            node.innerHTML = '';
            node.appendChild(wrapper);

            if(data['pagination'])
            {
                const pagination = document.createElement('div');
                pagination.className = 'swiper-pagination';
                node.appendChild(pagination);
            }

            if(data['navigation'])
            {
                const prev = document.createElement('div');
                prev.className = 'swiper-button-prev';
                const next = document.createElement('div');
                next.className = 'swiper-button-next';
                node.appendChild(prev);
                node.appendChild(next);
            }

            if(data['scrollbar'])
            {
                const scrollbar = document.createElement('div');
                scrollbar.className = 'swiper-scrollbar';
                node.appendChild(scrollbar);
            }
        };

        this.options = () =>
        {
            const config = {
                direction: data['direction'],
                slidesPerView: this.perView(),
                spaceBetween: data['space-between'],
                speed: data['speed'],
                loop: data['loop'],
                rewind: data['rewind'],
                grabCursor: data['grab-cursor'],
                autoHeight: data['autoheight'],
                slidesPerGroup: data['slides-per-group'],
                centeredSlides: data['centered'],
                keyboard: data['keyboard'] ? { enabled: true } : false,
                mousewheel: data['mousewheel'] ? { enabled: true } : false,
                parallax: data['parallax'] ? { enabled: true } : false,
                freeMode: data['free-mode'] ? { enabled: true } : false
            };

            this.effect(config);
            this.autoplay(config);
            this.pagination(config);
            this.navigation(config);
            this.scrollbar(config);

            return config;
        };

        this.perView = () =>
        {
            const value = data['slides-per-view'];
            if(value === 'auto')
            {
                return 'auto';
            }
            return parseFloat(value) || 1;
        };

        this.effect = (config) =>
        {
            const effect = data['effect'];
            config.effect = effect;

            if(effect === 'fade')
            {
                config.fadeEffect = { crossFade: data['crossfade'] };
            }
            else if(effect === 'coverflow')
            {
                config.coverflowEffect = {
                    depth: data['coverflow-depth'],
                    rotate: data['coverflow-rotate'],
                    stretch: data['coverflow-stretch'],
                    scale: data['coverflow-scale'],
                    slideShadows: true
                };
            }
            else if(effect === 'cards')
            {
                config.cardsEffect = {
                    perSlideOffset: data['cards-offset'],
                    rotate: data['cards-rotate'],
                    slideShadows: true
                };
            }
        };

        this.autoplay = (config) =>
        {
            if(!data['autoplay'])
            {
                return;
            }
            config.autoplay = {
                delay: data['autoplay-delay'],
                disableOnInteraction: false,
                pauseOnMouseEnter: data['autoplay-pause']
            };
        };

        this.pagination = (config) =>
        {
            if(!data['pagination'])
            {
                return;
            }
            config.pagination = {
                el: node.querySelector('.swiper-pagination'),
                type: data['pagination'],
                clickable: true
            };
        };

        this.navigation = (config) =>
        {
            if(!data['navigation'])
            {
                return;
            }
            config.navigation = {
                prevEl: node.querySelector('.swiper-button-prev'),
                nextEl: node.querySelector('.swiper-button-next')
            };
        };

        this.scrollbar = (config) =>
        {
            if(!data['scrollbar'])
            {
                return;
            }
            config.scrollbar = {
                el: node.querySelector('.swiper-scrollbar'),
                draggable: true
            };
        };

        this.init = () =>
        {
            this.structure();
            this.instance = new Swiper(node, this.options());
        };

        this.init();
    },
    destroy: function(data, node, transformer)
    {
        if(this.instance)
        {
            this.instance.destroy(true, true);
        }
    }
});
