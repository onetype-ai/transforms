transforms.ItemAdd({
    id: 'tilt',
    icon: 'view_in_ar',
    name: 'Tilt',
    description: '3D tilt effect that follows the cursor on hover.',
    config: {
        'max': ['number', 15],
        'perspective': ['number', 1000],
        'scale': ['number', 1.05],
        'speed': ['number', 300],
        'glare': ['boolean', false],
        'glare-opacity': ['number', 0.3]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-tilt';

        this.move = (e) =>
        {
            const rect = node.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            const rotateX = -(deltaY / (rect.height / 2)) * data['max'];
            const rotateY = (deltaX / (rect.width / 2)) * data['max'];

            node.style.transform = 'perspective(' + data['perspective'] + 'px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(' + data['scale'] + ')';

            if(this.glare)
            {
                const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 180;
                this.glare.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + data['glare-opacity'] + ') 0%, transparent 80%)';
                this.glare.style.opacity = '1';
            }
        };

        this.reset = () =>
        {
            node.style.transform = 'perspective(' + data['perspective'] + 'px) rotateX(0deg) rotateY(0deg) scale(1)';

            if(this.glare)
            {
                this.glare.style.opacity = '0';
            }
        };

        this.build = () =>
        {
            node.classList.add(prefix);
            node.style.transition = 'transform ' + data['speed'] + 'ms ease-out';

            if(data['glare'])
            {
                this.glare = document.createElement('div');
                this.glare.className = prefix + '-glare';
                this.glare.style.transition = 'opacity ' + data['speed'] + 'ms ease-out';
                node.appendChild(this.glare);
            }
        };

        this.events = () =>
        {
            node.addEventListener('mousemove', this.move);
            node.addEventListener('mouseleave', this.reset);
        };

        this.build();
        this.events();
    }
});
