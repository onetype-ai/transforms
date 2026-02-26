transforms.ItemAdd({
    id: 'magnetic',
    icon: 'attractions',
    name: 'Magnetic',
    description: 'Element follows the cursor with a magnetic pull effect.',
    config: {
        'strength': ['number', 0.3],
        'distance': ['number', 150],
        'duration': ['number', 0.4],
        'easing': ['string', 'ease-out']
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-magnetic';

        this.center = () =>
        {
            const rect = node.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        };

        this.move = (e) =>
        {
            const center = this.center();
            const deltaX = e.clientX - center.x;
            const deltaY = e.clientY - center.y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if(distance < data['distance'])
            {
                const x = deltaX * data['strength'];
                const y = deltaY * data['strength'];
                node.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
            }
            else
            {
                this.reset();
            }
        };

        this.reset = () =>
        {
            node.style.transform = 'translate(0, 0)';
        };

        this.build = () =>
        {
            node.classList.add(prefix);
            node.style.transition = 'transform ' + data['duration'] + 's ' + data['easing'];
            document.addEventListener('mousemove', this.move);
        };

        this.build();
    }
});
