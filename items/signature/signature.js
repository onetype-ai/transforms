transforms.ItemAdd({
    id: 'signature',
    icon: 'draw',
    name: 'Signature',
    description: 'Signature pad for capturing handwritten signatures.',
    js: ['https://cdn.jsdelivr.net/npm/signature_pad@5.1.3/dist/signature_pad.umd.min.js'],
    config: {
        'color': ['string', '#000000'],
        'width-min': ['number', 0.5],
        'width-max': ['number', 2.5],
        'background': ['string', '#ffffff'],
        'height': ['number', 200],
        'placeholder': ['string', 'Sign here'],
        'buttons': ['boolean', true],
        'undo': ['boolean', true],
        'download': ['boolean', true],
        'on-save': ['function', null]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-signature';

        this.element = (tag, className, parent) =>
        {
            const element = document.createElement(tag);
            element.className = prefix + '-' + className;
            parent.appendChild(element);
            return element;
        };

        this.canvas = () =>
        {
            this.wrapper = this.element('div', 'wrapper', node);
            this.wrapper.style.height = data['height'] + 'px';

            const canvas = document.createElement('canvas');
            canvas.className = prefix + '-canvas';
            this.wrapper.appendChild(canvas);

            this.placeholder = this.element('div', 'placeholder', this.wrapper);
            this.placeholder.textContent = data['placeholder'];

            this.pad = new SignaturePad(canvas, {
                penColor: data['color'],
                minWidth: data['width-min'],
                maxWidth: data['width-max'],
                backgroundColor: data['background']
            });

            return canvas;
        };

        this.resize = (canvas) =>
        {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            const saved = this.pad.toData();

            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext('2d').scale(ratio, ratio);

            this.pad.clear();
            this.pad.backgroundColor = data['background'];
            this.pad.fromData(saved);
        };

        this.toolbar = () =>
        {
            if(!data['buttons'])
            {
                return;
            }

            const toolbar = this.element('div', 'toolbar', this.wrapper);

            const clear = this.element('button', 'button', toolbar);
            clear.textContent = 'Clear';
            clear.addEventListener('click', () =>
            {
                this.pad.clear();
                this.state();
            });

            if(data['undo'])
            {
                const undo = this.element('button', 'button', toolbar);
                undo.textContent = 'Undo';
                undo.addEventListener('click', () =>
                {
                    const strokes = this.pad.toData();
                    if(strokes.length)
                    {
                        strokes.pop();
                        this.pad.fromData(strokes);
                        this.state();
                    }
                });
            }

            if(data['download'])
            {
                const download = this.element('button', 'button', toolbar);
                download.textContent = 'Download';
                download.addEventListener('click', () =>
                {
                    if(this.pad.isEmpty())
                    {
                        return;
                    }

                    const link = document.createElement('a');
                    link.download = 'signature.png';
                    link.href = this.pad.toDataURL('image/png');
                    link.click();
                });
            }

            if(data['on-save'])
            {
                const save = this.element('button', 'button ' + prefix + '-save', toolbar);
                save.textContent = 'Save';
                save.addEventListener('click', () =>
                {
                    if(this.pad.isEmpty())
                    {
                        return;
                    }

                    data['on-save'](this.pad.toDataURL('image/png'));
                });
            }
        };

        this.state = () =>
        {
            if(this.pad.isEmpty())
            {
                node.classList.add(prefix + '-empty');
            }
            else
            {
                node.classList.remove(prefix + '-empty');
            }
        };

        this.events = (canvas) =>
        {
            this.pad.addEventListener('endStroke', () =>
            {
                this.state();
            });

            let timeout;
            window.addEventListener('resize', () =>
            {
                clearTimeout(timeout);
                timeout = setTimeout(() =>
                {
                    this.resize(canvas);
                }, 100);
            });
        };

        this.build = () =>
        {
            node.classList.add(prefix);
            node.classList.add(prefix + '-empty');
            node.innerHTML = '';

            const canvas = this.canvas();
            this.toolbar();
            this.events(canvas);
            this.resize(canvas);
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        const canvas = node.querySelector('canvas');
        if(canvas && canvas._signaturePad)
        {
            canvas._signaturePad.off();
        }
    }
});
