const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/16,185,129/g, '30,75,153');
fs.writeFileSync('src/App.tsx', code);
