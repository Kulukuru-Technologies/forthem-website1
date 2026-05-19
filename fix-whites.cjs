const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/\bbg-white\/\d+\b/g, 'bg-[#FFFFFF]');
code = code.replace(/\bbg-white\b/g, 'bg-[#FFFFFF]');
code = code.replace(/\btext-white\/\d+\b/g, 'text-[#FFFFFF]');
code = code.replace(/\btext-white\b/g, 'text-[#FFFFFF]');
code = code.replace(/\bborder-white\/\d+\b/g, 'border-[#FFFFFF]');
code = code.replace(/\bborder-white\b/g, 'border-[#FFFFFF]');
code = code.replace(/\bbackdrop-blur(?:-[a-z0-9]+)?\b/g, '');

fs.writeFileSync('src/App.tsx', code);
