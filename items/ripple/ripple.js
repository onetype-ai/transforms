transforms.ItemAdd({
    id: 'ripple',
    icon: 'water_drop',
    name: 'Ripple',
    description: 'Material Design ripple effect on click.',
    config: {
        'color': ['string', 'currentColor'],
        'opacity': ['number', 0.2],
        'duration': ['number', 600],
        'centered': ['boolean', false]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-ripple';

        this.spawn = (e) =>
        {
            const rect = node.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;

            let x, y;
            if(data['centered'])
            {
                x = rect.width / 2;
                y = rect.height / 2;
            }
            else
            {
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            }

            const circle = document.createElement('span');
            circle.className = prefix + '-circle';
            circle.style.width = size + 'px';
            circle.style.height = size + 'px';
            circle.style.left = (x - size / 2) + 'px';
            circle.style.top = (y - size / 2) + 'px';
            circle.style.background = data['color'];
            circle.style.opacity = data['opacity'];
            circle.style.animationDuration = data['duration'] + 'ms';

            node.appendChild(circle);

            circle.addEventListener('animationend', () =>
            {
                circle.remove();
            });
        };

        this.build = () =>
        {
            node.classList.add(prefix);
            node.addEventListener('click', this.spawn);
        };

        this.build();
    }
});
