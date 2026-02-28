import commands from '@onetype/framework/commands';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, basename } from 'path';

const root = resolve(import.meta.dirname, '..', '..', '..');
const server = resolve(import.meta.dirname, '..', '..');
const item = process.argv[2];
const folder = item ? resolve(root, 'items', item) : null;
const template = readFileSync(resolve(server, 'front', 'index.html'), 'utf-8');

commands.Item({
    id: 'home',
    exposed: true,
    method: 'GET',
    endpoint: '/',
    type: 'HTML',
    callback: async function(properties, response)
    {
        this.label = (filename) =>
        {
            return basename(filename, '.html').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        };

        this.encode = (html) =>
        {
            return html.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
        };

        this.section = (name, content) =>
        {
            return `<div class="onetype-section" data-source="${this.encode(content.trim())}">
                <div class="onetype-label">
                    <span>${name}</span>
                    <button class="onetype-copy">Copy</button>
                </div>
                <div class="onetype-preview">${content}</div>
            </div>`;
        };

        this.usage = () =>
        {
            const file = resolve(folder, 'usage.html');

            if(!existsSync(file))
            {
                return '';
            }

            return this.section('Basic Usage', readFileSync(file, 'utf-8'));
        };

        this.previews = () =>
        {
            const dir = resolve(folder, 'previews');

            if(!existsSync(dir))
            {
                return '';
            }

            const files = readdirSync(dir).filter(f => f.endsWith('.html')).sort();
            let html = '';

            for(const file of files)
            {
                const content = readFileSync(resolve(dir, file), 'utf-8');
                html += this.section(this.label(file), content);
            }

            return html;
        };

        this.render = () =>
        {
            if(!item)
            {
                return `<div class="onetype-empty">
                    <h2>No transform specified</h2>
                    <p>Run with: <code>node server {name}</code></p>
                    <p style="margin-top:var(--ot-spacing-x);">Example: <code>node server anime</code></p>
                </div>`;
            }

            if(!existsSync(folder))
            {
                return `<div class="onetype-empty">
                    <h2>Transform not found: <span style="color:var(--ot-red);">${item}</span></h2>
                    <p>Expected folder: <code>items/${item}/</code></p>
                </div>`;
            }

            return `<div class="onetype-page">
                ${this.usage()}
                ${this.previews()}
            </div>`;
        };

        const title = 'OneType Transforms' + (item ? ' — ' + item : '');
        const body = this.render();

        response(template.replace('{{title}}', title).replace('{{body}}', body));
    }
});
