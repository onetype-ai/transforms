import commands from '@onetype/framework/commands';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const root = resolve(import.meta.dirname, '..', '..', '..');
const item = process.argv[2];
const file = item ? resolve(root, 'items', item, 'demo.html') : null;

commands.Item({
    id: 'home',
    exposed: true,
    method: 'GET',
    endpoint: '/',
    type: 'HTML',
    callback: async function(properties, resolve)
    {
        let body = '';

        if(!item)
        {
            body = `<div style="text-align:center;">
                <h2 style="color:var(--ot-text-1);margin-bottom:var(--ot-spacing-s);">No transform specified</h2>
                <p style="color:var(--ot-text-2);">Run with: <code style="background:var(--ot-bg-3);color:var(--ot-brand);padding:var(--ot-spacing-x) var(--ot-spacing-s);border-radius:var(--ot-radius-s);font-size:var(--ot-size-s);">node server {name}</code></p>
                <p style="color:var(--ot-text-2);margin-top:var(--ot-spacing-x);">Example: <code style="background:var(--ot-bg-3);color:var(--ot-brand);padding:var(--ot-spacing-x) var(--ot-spacing-s);border-radius:var(--ot-radius-s);font-size:var(--ot-size-s);">node server test</code></p>
            </div>`;
        }
        else
        {
            if(existsSync(file))
            {
                body = readFileSync(file, 'utf-8');
            }
            else
            {
                body = `<div style="text-align:center;">
                    <h2 style="color:var(--ot-text-1);margin-bottom:var(--ot-spacing-s);">Transform not found: <span style="color:var(--ot-red);">${item}</span></h2>
                    <p style="color:var(--ot-text-2);">Expected file: <code style="background:var(--ot-bg-3);color:var(--ot-brand);padding:var(--ot-spacing-x) var(--ot-spacing-s);border-radius:var(--ot-radius-s);font-size:var(--ot-size-s);">items/${item}/demo.html</code></p>
                </div>`;
            }
        }

        resolve(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OneType Transforms${item ? ' — ' + item : ''}</title>
    <link rel="icon" href="https://cdn.onetype.ai/brand/logo/icon-orange.svg">
    <link rel="stylesheet" href="/assets/build.css">
    <script src="/assets/build.js" defer></script>
</head>
<body>
    ${body}
</body>
</html>`);
    }
});
