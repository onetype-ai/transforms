transforms.ItemAdd({
    id: 'scramble',
    icon: 'password',
    name: 'Scramble',
    description: 'Text decode effect that reveals text through randomized characters.',
    config: {
        'speed': ['number', 50],
        'scramble-speed': ['number', 30],
        'delay': ['number', 0],
        'back-delay': ['number', 1500],
        'loop': ['boolean', true],
        'chars': ['string', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'],
        'trigger': ['string', 'scroll']
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-scramble';
        const chars = data['chars'];

        this.random = (length) =>
        {
            let result = '';
            for(let i = 0; i < length; i++)
            {
                result += chars[Math.floor(Math.random() * chars.length)];
            }
            return result;
        };

        this.reveal = () =>
        {
            const target = this.strings[this.index];
            this.revealed = 0;
            this.scrambleInterval = setInterval(() => this.refresh(), data['scramble-speed']);
            this.revealInterval = setInterval(() =>
            {
                this.revealed++;
                if(this.revealed >= target.length)
                {
                    clearInterval(this.revealInterval);
                    clearInterval(this.scrambleInterval);
                    this.display.textContent = target;
                    this.next();
                }
            }, data['speed']);
        };

        this.refresh = () =>
        {
            const target = this.strings[this.index];
            const revealed = target.substring(0, this.revealed);
            const remaining = target.length - this.revealed;
            this.display.textContent = revealed + this.random(remaining);
        };

        this.next = () =>
        {
            if(this.strings.length <= 1 && !data['loop'])
            {
                return;
            }

            this.index++;
            if(this.index >= this.strings.length)
            {
                if(!data['loop'])
                {
                    return;
                }
                this.index = 0;
            }

            setTimeout(() => this.reveal(), data['back-delay']);
        };

        this.start = () =>
        {
            this.display.textContent = this.random(this.strings[0].length);
            setTimeout(() => this.reveal(), data['delay']);
        };

        this.build = () =>
        {
            const children = node.querySelectorAll(':scope > *');
            this.strings = [];

            children.forEach((child) =>
            {
                this.strings.push(child.textContent.trim());
            });

            if(this.strings.length === 0)
            {
                this.strings.push(node.textContent.trim());
            }

            if(this.strings.length === 0)
            {
                return;
            }

            node.innerHTML = '';
            node.classList.add(prefix);

            this.display = document.createElement('span');
            this.display.className = prefix + '-text';
            node.appendChild(this.display);

            this.index = 0;
            this.revealed = 0;

            if(data['trigger'] === 'scroll')
            {
                this.observer = new IntersectionObserver((entries) =>
                {
                    if(entries[0].isIntersecting)
                    {
                        this.observer.disconnect();
                        this.start();
                    }
                }, { threshold: 0.1 });
                this.observer.observe(node);
            }
            else
            {
                this.start();
            }
        };

        this.build();
    }
});
