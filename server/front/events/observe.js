onetype.AddonReady('transforms', function()
{
    const observe = () =>
    {
        new MutationObserver((mutations) =>
        {
            for(const mutation of mutations)
            {
                for(const node of mutation.addedNodes)
                {
                    if(node.nodeType !== 1)
                    {
                        continue;
                    }

                    if(node.hasAttribute('ot'))
                    {
                        transforms.Fn('process', node);
                    }

                    node.querySelectorAll('[ot]').forEach(child =>
                    {
                        transforms.Fn('process', child);
                    });
                }
            }
        }).observe(document.body, { childList: true, subtree: true });
    };

    if(document.readyState === 'loading')
    {
        document.addEventListener('DOMContentLoaded', observe);
    }
    else
    {
        observe();
    }
});
