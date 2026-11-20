import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const f = path.join(root, 'src', 'dashboard', 'DashboardBody.jsx');
let s = fs.readFileSync(f, 'utf8');

const bare = [
  'lvColorSoft', 'lvWash', 'lvColor', 'autoBc', 'autoBg', 'autoFg',
];
for (const name of bare) {
  s = s.replace(new RegExp(`\\$\\{${name}\\}`, 'g'), `\${v.${name}}`);
}
s = s.replace(/linear-gradient\(90deg,\{lvColorSoft\}/g, 'linear-gradient(90deg,${v.lvColorSoft}');
s = s.replace(/([a-zA-Z][a-zA-Z0-9]*)="\{([^"]+)\}"/g, '$1={$2}');

fs.writeFileSync(f, s);
console.log('patched bare template vars');