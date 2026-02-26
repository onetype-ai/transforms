transforms.ItemAdd({
    id: 'orbit',
    icon: 'motion_photos_on',
    name: 'Orbit',
    description: 'Child elements arranged in orbit with gentle floating motion.',
    config: {
        'radius': ['number', 150],
        'drift': ['number', 15],
        'speed': ['number', 3]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-orbit';

        this.random = (min, max) =>
        {
            return min + Math.random() * (max - min);
        };

        this.place = (child, angle, radius) =>
        {
            const rad = angle * (Math.PI / 180);
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            const wrapper = document.createElement('div');
            wrapper.className = prefix + '-item';
            wrapper.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

            const drift = data['drift'];
            const dx = this.random(-drift, drift);
            const dy = this.random(-drift, drift);
            const duration = this.random(data['speed'] * 0.7, data['speed'] * 1.3);
            const delay = this.random(0, duration);

            wrapper.style.setProperty('--dx', dx + 'px');
            wrapper.style.setProperty('--dy', dy + 'px');
            wrapper.style.animationDuration = duration + 's';
            wrapper.style.animationDelay = '-' + delay + 's';

            wrapper.appendChild(child);
            return wrapper;
        };

        this.build = () =>
        {
            const children = [...node.children];
            if(children.length === 0)
            {
                return;
            }

            node.classList.add(prefix);

            const max = this.size(children);
            node.style.width = (max * 2) + 'px';
            node.style.height = (max * 2) + 'px';

            const configs = children.map((child, index) =>
            {
                const radius = parseInt(child.getAttribute('radius')) || data['radius'];
                const angle = parseInt(child.getAttribute('angle')) || Math.round((360 / children.length) * index + this.random(-15, 15));
                child.removeAttribute('radius');
                child.removeAttribute('angle');
                return { radius, angle };
            });

            node.innerHTML = '';

            configs.forEach((config, index) =>
            {
                node.appendChild(this.place(children[index], config.angle, config.radius));
            });
        };

        this.size = (children) =>
        {
            let max = data['radius'];

            children.forEach((child) =>
            {
                const radius = parseInt(child.getAttribute('radius')) || data['radius'];
                if(radius > max)
                {
                    max = radius;
                }
            });

            return max;
        };

        this.build();
    }
});
