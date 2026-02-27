transforms.ItemAdd({
    id: 'map',
    icon: 'map',
    name: 'Map',
    description: 'Interactive map with markers, popups and multiple tile styles.',
    js: ['https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js'],
    css: ['https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css'],
    config: {
        'lat': ['number', 48.2082],
        'lng': ['number', 16.3738],
        'zoom': ['number', 13],
        'style': ['string', 'streets'],
        'height': ['number', 400],
        'zoom-control': ['boolean', true],
        'scroll-zoom': ['boolean', true],
        'dragging': ['boolean', true],
        'max-zoom': ['number', 19],
        'min-zoom': ['number', 1]
    },
    code: function(data, node, transformer)
    {
        const prefix = 'ot-map';

        this.tiles = {
            streets: {
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19
            },
            light: {
                url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
                maxZoom: 20
            },
            dark: {
                url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
                maxZoom: 20
            },
            voyager: {
                url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
                maxZoom: 20
            },
            satellite: {
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                attribution: 'Tiles &copy; Esri',
                maxZoom: 18
            },
            topo: {
                url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
                maxZoom: 17
            }
        };

        this.markers = () =>
        {
            const children = [...node.children];
            const items = [];

            children.forEach((child) =>
            {
                const lat = parseFloat(child.getAttribute('lat'));
                const lng = parseFloat(child.getAttribute('lng'));

                if(isNaN(lat) || isNaN(lng))
                {
                    return;
                }

                const popup = child.getAttribute('popup') || '';
                const content = child.innerHTML.trim();

                child.remove();

                items.push({ lat, lng, popup, content });
            });

            return items;
        };

        this.icon = (content) =>
        {
            if(!content)
            {
                return undefined;
            }

            return L.divIcon({
                html: '<div class="' + prefix + '-icon">' + content + '</div>',
                className: prefix + '-marker',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });
        };

        this.pin = (item) =>
        {
            const options = {};
            const icon = this.icon(item.content);

            if(icon)
            {
                options.icon = icon;
            }

            const marker = L.marker([item.lat, item.lng], options).addTo(this.instance);

            if(item.popup)
            {
                marker.bindPopup(item.popup);
            }
        };

        this.build = () =>
        {
            const items = this.markers();

            node.classList.add(prefix);
            node.style.height = data['height'] + 'px';
            node.innerHTML = '';

            const container = document.createElement('div');
            container.className = prefix + '-container';
            node.appendChild(container);

            const tile = this.tiles[data['style']] || this.tiles.streets;

            this.instance = L.map(container, {
                center: [data['lat'], data['lng']],
                zoom: data['zoom'],
                zoomControl: data['zoom-control'],
                scrollWheelZoom: data['scroll-zoom'],
                dragging: data['dragging'],
                maxZoom: Math.min(data['max-zoom'], tile.maxZoom),
                minZoom: data['min-zoom']
            });

            L.tileLayer(tile.url, {
                attribution: tile.attribution,
                maxZoom: tile.maxZoom
            }).addTo(this.instance);

            items.forEach((item) => this.pin(item));

            setTimeout(() => this.instance.invalidateSize(), 100);
        };

        this.build();
    },
    destroy: function(data, node, transformer)
    {
        if(this.instance)
        {
            this.instance.remove();
        }
    }
});
