transforms.ItemAdd({
    id: 'count-up',
    icon: 'trending_up',
    name: 'Count Up',
    description: 'Animated number counter that counts up when scrolled into view.',
    js: ['https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.9.0/countUp.umd.min.js'],
    config: {
        'end': ['number', 100],
        'start': ['number', 0],
        'duration': ['number', 2],
        'decimals': ['number', 0],
        'prefix': ['string', ''],
        'suffix': ['string', ''],
        'separator': ['string', ','],
        'decimal': ['string', '.'],
        'easing': ['boolean', true],
        'once': ['boolean', true]
    },
    code: function(data, node, transformer)
    {
        this.init = () =>
        {
            const instance = new countUp.CountUp(node, data['end'], {
                startVal: data['start'],
                duration: data['duration'],
                decimalPlaces: data['decimals'],
                prefix: data['prefix'],
                suffix: data['suffix'],
                separator: data['separator'],
                decimal: data['decimal'],
                useEasing: data['easing'],
                enableScrollSpy: true,
                scrollSpyOnce: data['once']
            });

            if(instance.error)
            {
                console.error('count-up:', instance.error);
                return;
            }

            instance.handleScroll();
        };

        this.init();
    }
});
