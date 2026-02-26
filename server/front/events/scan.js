onetype.AddonReady('transforms', function()
{
    if(document.readyState === 'loading')
    {
        document.addEventListener('DOMContentLoaded', () =>
        {
            document.querySelectorAll('[ot]').forEach(node =>
            {
                transforms.Fn('process', node);
            });
        });
    }
    else
    {
        document.querySelectorAll('[ot]').forEach(node =>
        {
            transforms.Fn('process', node);
        });
    }
});
