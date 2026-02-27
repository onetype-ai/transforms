transforms.ItemAdd({
    id: 'marquee',
    icon: 'view_carousel',
    name: 'Marquee',
    description: 'Infinite scrolling marquee for logos, text, and any content.',
    config: {
        'speed': ['number', 30],
        'direction': ['string', 'left'],
        'gap': ['number', 40],
        'pause': ['boolean', true],
        'fade': ['boolean', true],
        'height': ['number', 0]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-marquee';
        const vertical = data['direction'] === 'up' || data['direction'] === 'down';
        const reverse = data['direction'] === 'right' || data['direction'] === 'down';
        const axis = vertical ? 'Y' : 'X';

        this.track = (items) =>
        {
            const track = document.createElement('div');
            track.className = prefix + '-track';
            track.style.setProperty('--marquee-gap', data['gap'] + 'px');

            if(vertical)
            {
                track.classList.add(prefix + '-vertical');
            }

            const primary = document.createElement('div');
            primary.className = prefix + '-content';

            items.forEach((item) =>
            {
                primary.appendChild(item);
            });

            track.appendChild(primary);

            return { track: track, primary: primary };
        };

        this.fill = (track, primary) =>
        {
            const container = vertical ? node.offsetHeight : node.offsetWidth;
            const content = vertical ? primary.offsetHeight : primary.offsetWidth;
            const copies = Math.ceil(container / content) + 2;

            for(let i = 0; i < copies; i++)
            {
                const clone = primary.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                track.appendChild(clone);
            }
        };

        this.animate = (track, primary) =>
        {
            const size = vertical ? primary.offsetHeight : primary.offsetWidth;
            const distance = size + data['gap'];
            const name = prefix + '-' + Math.random().toString(36).substring(2, 7);

            this.sheet = document.createElement('style');
            this.sheet.textContent = '@keyframes ' + name + ' { from { transform: translate' + axis + '(0); } to { transform: translate' + axis + '(-' + distance + 'px); } }';
            document.head.appendChild(this.sheet);

            track.style.animation = name + ' ' + data['speed'] + 's linear infinite';

            if(reverse)
            {
                track.style.animationDirection = 'reverse';
            }
        };

        this.build = () =>
        {
            const items = Array.from(node.children);

            node.classList.add(prefix);

            if(data['height'])
            {
                node.style.height = data['height'] + 'px';
            }

            if(data['pause'])
            {
                node.classList.add(prefix + '-pause');
            }

            if(data['fade'])
            {
                node.classList.add(prefix + '-fade');

                if(vertical)
                {
                    node.classList.add(prefix + '-fade-vertical');
                }
            }

            const { track, primary } = this.track(items);

            node.innerHTML = '';
            node.appendChild(track);

            this.fill(track, primary);
            this.animate(track, primary);
        };

        this.build();
    }
});
