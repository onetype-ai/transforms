transforms.ItemAdd({
    id: 'test',
    icon: 'flask',
    name: 'Test',
    description: 'A simple test transform for development.',
    config: {
        'color': ['string', 'orange'],
        'size': ['number', 32]
    },
    code: function(data, node, transformer)
    {
        node.style.backgroundColor = data['color'];
        node.style.fontSize = data['size'] + 'px';
    }
});
