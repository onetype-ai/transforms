transforms.Fn('process', function(node)
{
    const id = node.getAttribute('ot');

    if(!id)
    {
        return;
    }

    node.removeAttribute('ot');
    transforms.Fn('run', id, node);
});
