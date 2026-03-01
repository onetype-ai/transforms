transforms.ItemAdd({
    id: 'lightbox',
    icon: 'fullscreen',
    name: 'Lightbox',
    description: 'Fullscreen image gallery with zoom, swipe, and keyboard navigation.',
    config: {
        'zoom': ['boolean', true],
        'swipe': ['boolean', true],
        'counter': ['boolean', true],
        'loop': ['boolean', true]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-lightbox';

        this.index = 0;
        this.images = [];
        this.scale = 1;
        this.point = { x: 0, y: 0 };
        this.drag = { active: false, startX: 0, startY: 0, originX: 0, originY: 0 };
        this.swipeStart = { x: 0, y: 0, time: 0 };
        this.zoomed = false;

        this.svg = (path) =>
        {
            return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + path + '"/></svg>';
        };

        this.element = (tag, className, parent) =>
        {
            const el = document.createElement(tag);
            el.className = className;
            parent.appendChild(el);
            return el;
        };

        this.collect = () =>
        {
            const elements = node.querySelectorAll('img');
            const items = [];

            for(let i = 0; i < elements.length; i++)
            {
                const img = elements[i];
                items.push({
                    src: img.getAttribute('data-full') || img.src,
                    caption: img.getAttribute('alt') || ''
                });
            }

            return items;
        };

        this.preload = (index) =>
        {
            const img = new Image();
            img.src = this.images[index].src;
        };

        this.adjacent = () =>
        {
            const count = this.images.length;

            if(count < 2)
            {
                return;
            }

            const next = (this.index + 1) % count;
            const prev = (this.index - 1 + count) % count;

            this.preload(next);
            this.preload(prev);
        };

        this.create = () =>
        {
            this.dialog = document.createElement('dialog');
            this.dialog.className = prefix + '-dialog';

            this.viewport = this.element('div', prefix + '-viewport', this.dialog);

            this.img = this.element('img', prefix + '-image ' + prefix + '-loading', this.viewport);
            this.img.setAttribute('draggable', 'false');

            this.close = this.element('button', prefix + '-close', this.dialog);
            this.close.innerHTML = this.svg('M18 6L6 18M6 6l12 12');
            this.close.setAttribute('aria-label', 'Close');

            this.prev = this.element('button', prefix + '-prev', this.dialog);
            this.prev.innerHTML = this.svg('M15 18l-6-6 6-6');
            this.prev.setAttribute('aria-label', 'Previous');

            this.next = this.element('button', prefix + '-next', this.dialog);
            this.next.innerHTML = this.svg('M9 18l6-6-6-6');
            this.next.setAttribute('aria-label', 'Next');

            if(data['counter'])
            {
                this.counter = this.element('span', prefix + '-counter', this.dialog);
            }

            this.caption = this.element('div', prefix + '-caption', this.dialog);

            document.body.appendChild(this.dialog);
        };

        this.show = (index) =>
        {
            this.index = index;
            this.reset();

            const item = this.images[index];

            this.img.classList.add(prefix + '-loading');
            this.img.onload = () =>
            {
                this.img.classList.remove(prefix + '-loading');
            };
            this.img.src = item.src;

            if(item.caption)
            {
                this.caption.textContent = item.caption;
                this.caption.style.display = '';
            }
            else
            {
                this.caption.style.display = 'none';
            }

            if(data['counter'] && this.counter)
            {
                this.counter.textContent = (index + 1) + ' / ' + this.images.length;
            }

            if(this.images.length < 2)
            {
                this.dialog.classList.add(prefix + '-single');
            }
            else
            {
                this.dialog.classList.remove(prefix + '-single');
            }

            this.adjacent();
        };

        this.open = (index) =>
        {
            this.show(index);
            this.dialog.showModal();
        };

        this.dismiss = () =>
        {
            this.dialog.classList.add(prefix + '-closing');

            this.dialog.addEventListener('animationend', () =>
            {
                this.dialog.classList.remove(prefix + '-closing');
                this.dialog.close();
                this.reset();
            }, { once: true });
        };

        this.go = (direction) =>
        {
            if(this.zoomed)
            {
                return;
            }

            const count = this.images.length;

            if(count < 2)
            {
                return;
            }

            let target = this.index + direction;

            if(data['loop'])
            {
                target = (target + count) % count;
            }
            else
            {
                if(target < 0 || target >= count)
                {
                    return;
                }
            }

            this.show(target);
        };

        this.reset = () =>
        {
            this.scale = 1;
            this.point = { x: 0, y: 0 };
            this.zoomed = false;
            this.drag.active = false;
            this.img.classList.remove(prefix + '-zoomed', prefix + '-dragging');
            this.img.style.transform = '';
            this.img.style.transformOrigin = '';
        };

        this.transform = () =>
        {
            this.img.style.transform = 'translate(' + this.point.x + 'px, ' + this.point.y + 'px) scale(' + this.scale + ')';
        };

        this.zoomAt = (clientX, clientY, delta) =>
        {
            const rect = this.img.getBoundingClientRect();
            const x = (clientX - this.point.x - rect.left + (this.point.x)) / this.scale;
            const y = (clientY - this.point.y - rect.top + (this.point.y)) / this.scale;

            const prev = this.scale;

            if(delta > 0)
            {
                this.scale = Math.min(this.scale * 1.2, 10);
            }
            else
            {
                this.scale = Math.max(this.scale / 1.2, 1);
            }

            this.point.x = clientX - x * this.scale - (rect.left - this.point.x);
            this.point.y = clientY - y * this.scale - (rect.top - this.point.y);

            if(this.scale <= 1)
            {
                this.point.x = 0;
                this.point.y = 0;
                this.scale = 1;
                this.zoomed = false;
                this.img.classList.remove(prefix + '-zoomed');
            }
            else
            {
                this.zoomed = true;
                this.img.classList.add(prefix + '-zoomed');
            }

            this.transform();
        };

        this.wheel = (e) =>
        {
            if(!data['zoom'])
            {
                return;
            }

            e.preventDefault();
            this.zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1 : -1);
        };

        this.dragStart = (e) =>
        {
            if(!this.zoomed)
            {
                return;
            }

            e.preventDefault();
            this.drag.active = true;
            this.drag.startX = e.clientX;
            this.drag.startY = e.clientY;
            this.drag.originX = this.point.x;
            this.drag.originY = this.point.y;
            this.img.classList.add(prefix + '-dragging');
        };

        this.dragMove = (e) =>
        {
            if(!this.drag.active)
            {
                return;
            }

            this.point.x = this.drag.originX + (e.clientX - this.drag.startX);
            this.point.y = this.drag.originY + (e.clientY - this.drag.startY);
            this.transform();
        };

        this.dragEnd = () =>
        {
            this.drag.active = false;
            this.img.classList.remove(prefix + '-dragging');
        };

        this.touchStart = (e) =>
        {
            if(e.touches.length === 1 && !this.zoomed)
            {
                this.swipeStart.x = e.touches[0].clientX;
                this.swipeStart.y = e.touches[0].clientY;
                this.swipeStart.time = Date.now();
            }
            else if(e.touches.length === 1 && this.zoomed)
            {
                this.drag.active = true;
                this.drag.startX = e.touches[0].clientX;
                this.drag.startY = e.touches[0].clientY;
                this.drag.originX = this.point.x;
                this.drag.originY = this.point.y;
            }
            else if(e.touches.length === 2 && data['zoom'])
            {
                e.preventDefault();
                this.pinch = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                this.pinchScale = this.scale;
            }
        };

        this.touchMove = (e) =>
        {
            if(e.touches.length === 2 && this.pinch > 0)
            {
                e.preventDefault();
                const dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                const ratio = dist / this.pinch;
                const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

                this.scale = Math.max(1, Math.min(this.pinchScale * ratio, 10));

                if(this.scale > 1)
                {
                    this.zoomed = true;
                    this.img.classList.add(prefix + '-zoomed');
                }

                this.transform();
            }
            else if(e.touches.length === 1 && this.drag.active)
            {
                this.point.x = this.drag.originX + (e.touches[0].clientX - this.drag.startX);
                this.point.y = this.drag.originY + (e.touches[0].clientY - this.drag.startY);
                this.transform();
            }
        };

        this.touchEnd = (e) =>
        {
            if(this.pinch > 0)
            {
                this.pinch = 0;

                if(this.scale <= 1)
                {
                    this.reset();
                }

                return;
            }

            if(this.drag.active)
            {
                this.drag.active = false;
                return;
            }

            if(!data['swipe'] || e.changedTouches.length === 0)
            {
                return;
            }

            const dx = e.changedTouches[0].clientX - this.swipeStart.x;
            const dy = e.changedTouches[0].clientY - this.swipeStart.y;
            const elapsed = Date.now() - this.swipeStart.time;

            if(elapsed > 500)
            {
                return;
            }

            if(Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy))
            {
                this.go(dx > 0 ? -1 : 1);
            }
        };

        this.keyboard = (e) =>
        {
            if(e.key === 'ArrowRight')
            {
                e.preventDefault();
                this.go(1);
            }
            else if(e.key === 'ArrowLeft')
            {
                e.preventDefault();
                this.go(-1);
            }
            else if(e.key === 'Escape')
            {
                e.preventDefault();
                this.dismiss();
            }
        };

        this.events = () =>
        {
            const imgs = node.querySelectorAll('img');

            for(let i = 0; i < imgs.length; i++)
            {
                imgs[i].addEventListener('click', () => this.open(i));
            }

            this.close.addEventListener('click', () => this.dismiss());
            this.prev.addEventListener('click', () => this.go(-1));
            this.next.addEventListener('click', () => this.go(1));

            this.dialog.addEventListener('keydown', (e) => this.keyboard(e));
            this.dialog.addEventListener('cancel', (e) =>
            {
                e.preventDefault();
                this.dismiss();
            });

            this.viewport.addEventListener('click', (e) =>
            {
                if(e.target === this.viewport && !this.zoomed)
                {
                    this.dismiss();
                }
            });

            this.viewport.addEventListener('wheel', (e) => this.wheel(e), { passive: false });

            this.img.addEventListener('mousedown', (e) => this.dragStart(e));
            window.addEventListener('mousemove', (e) => this.dragMove(e));
            window.addEventListener('mouseup', () => this.dragEnd());

            this.viewport.addEventListener('touchstart', (e) => this.touchStart(e), { passive: false });
            this.viewport.addEventListener('touchmove', (e) => this.touchMove(e), { passive: false });
            this.viewport.addEventListener('touchend', (e) => this.touchEnd(e));
        };

        this.build = () =>
        {
            this.images = this.collect();

            if(this.images.length === 0)
            {
                return;
            }

            node.classList.add(prefix);
            this.create();
            this.events();
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        if(this.dialog)
        {
            if(this.dialog.open)
            {
                this.dialog.close();
            }

            this.dialog.remove();
        }
    }
});
