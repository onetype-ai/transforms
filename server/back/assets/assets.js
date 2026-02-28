import assets from '@onetype/framework/assets';
import { resolve } from 'path';

const server = resolve(import.meta.dirname, '..', '..');
const root = resolve(server, '..');
const item = process.argv[2];

assets.Fn('import', ['framework', 'styles']);
assets.Fn('import', ['transforms']);

assets.Item({ type: 'js', order: 10, path: resolve(server, 'front') });
assets.Item({ type: 'css', order: 10, content: '[ot] { opacity: 0 }'});

if(item)
{
    assets.Item({ type: 'js', order: 20, path: resolve(root, 'items', item) });
    assets.Item({ type: 'css', order: 20, path: resolve(root, 'items', item) });
}
