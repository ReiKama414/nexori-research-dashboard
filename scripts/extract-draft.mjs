import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const m = html.match(/<x-dc>([\s\S]*)<\/x-dc>/);
if (!m) {
  console.error('no x-dc');
  process.exit(1);
}
let t = m[1].replace(/<helmet>[\s\S]*?<\/helmet>/, '');
fs.mkdirSync(path.join(root, 'scripts'), { recursive: true });
fs.writeFileSync(path.join(root, 'scripts', '_body.html'), t.trim());
console.log('bytes', t.length);