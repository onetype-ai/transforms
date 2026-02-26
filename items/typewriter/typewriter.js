transforms.ItemAdd({
    id: 'typewriter',
    icon: 'keyboard',
    name: 'Typewriter',
    description: 'Typewriter text animation that cycles through strings with typing and deleting effects.',
    config: {
        'speed': ['number', 50],
        'back-speed': ['number', 30],
        'back-delay': ['number', 1000],
        'start-delay': ['number', 0],
        'loop': ['boolean', true],
        'cursor': ['boolean', true],
        'cursor-char': ['string', '|'],
        'smart-backspace': ['boolean', true],
        'shuffle': ['boolean', false]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-typewriter';

        this.element = (tag, className, parent) =>
        {
            const element = document.createElement(tag);
            element.className = className;
            parent.appendChild(element);
            return element;
        };

        this.parse = (text) =>
        {
            const parts = [];
            let remaining = text;

            while(remaining.length > 0)
            {
                const match = remaining.match(/\^(\d+)/);
                if(match)
                {
                    const index = match.index;
                    if(index > 0)
                    {
                        parts.push({ text: remaining.substring(0, index) });
                    }
                    parts.push({ pause: parseInt(match[1]) });
                    remaining = remaining.substring(index + match[0].length);
                }
                else
                {
                    parts.push({ text: remaining });
                    remaining = '';
                }
            }

            return parts;
        };

        this.common = (a, b) =>
        {
            let length = 0;
            const max = Math.min(a.length, b.length);

            while(length < max && a[length] === b[length])
            {
                length++;
            }

            return length;
        };

        this.type = () =>
        {
            const parts = this.parts;
            const part = parts[this.part];

            if(!part)
            {
                setTimeout(() => this.back(), data['back-delay']);
                return;
            }

            if(part.pause)
            {
                this.part++;
                setTimeout(() => this.type(), part.pause);
                return;
            }

            if(this.char < part.text.length)
            {
                this.display.textContent += part.text[this.char];
                this.char++;
                setTimeout(() => this.type(), data['speed']);
            }
            else
            {
                this.part++;
                this.char = 0;
                this.type();
            }
        };

        this.back = () =>
        {
            const current = this.display.textContent;
            const target = this.stop;

            if(current.length > target)
            {
                this.display.textContent = current.substring(0, current.length - 1);
                setTimeout(() => this.back(), data['back-speed']);
            }
            else
            {
                this.next();
            }
        };

        this.next = () =>
        {
            this.index++;

            if(this.index >= this.strings.length)
            {
                if(!data['loop'])
                {
                    return;
                }
                this.index = 0;
                if(data['shuffle'])
                {
                    this.shuffle();
                }
            }

            const current = this.display.textContent;
            const next = this.flat[this.index];

            if(data['smart-backspace'])
            {
                this.stop = this.common(current, next);
            }
            else
            {
                this.stop = 0;
            }

            this.parts = this.parsed[this.index];
            this.part = 0;
            this.char = 0;

            if(this.stop > 0)
            {
                const first = this.parts[0];
                if(first && first.text)
                {
                    this.parts = [{ text: first.text.substring(this.stop) }, ...this.parts.slice(1)];
                }
            }

            if(current.length > this.stop)
            {
                this.back();
            }
            else
            {
                this.type();
            }
        };

        this.shuffle = () =>
        {
            for(let i = this.strings.length - 1; i > 0; i--)
            {
                const j = Math.floor(Math.random() * (i + 1));
                [this.strings[i], this.strings[j]] = [this.strings[j], this.strings[i]];
                [this.parsed[i], this.parsed[j]] = [this.parsed[j], this.parsed[i]];
                [this.flat[i], this.flat[j]] = [this.flat[j], this.flat[i]];
            }
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
                return;
            }

            this.parsed = this.strings.map((s) => this.parse(s));
            this.flat = this.strings.map((s) => s.replace(/\^\d+/g, ''));

            if(data['shuffle'])
            {
                this.shuffle();
            }

            node.innerHTML = '';
            node.classList.add(prefix);

            this.display = this.element('span', prefix + '-text', node);

            if(data['cursor'])
            {
                const cursor = this.element('span', prefix + '-cursor', node);
                cursor.textContent = data['cursor-char'];
            }

            this.index = 0;
            this.parts = this.parsed[0];
            this.part = 0;
            this.char = 0;
            this.stop = 0;

            setTimeout(() => this.type(), data['start-delay']);
        };

        this.build();
    }
});
