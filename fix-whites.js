const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The main background is already #fffdf7.
// Now convert all white variations (bg-white, bg-white/40, text-white/50, border-white/20, etc.)
// to exact #FFFFFF for foreground, and remove backdrop-blur.
code = code.replace(/\bbg-white\/\d+\b/g, 'bg-[#FFFFFF]');
code = code.replace(/\bbg-white\b/g, 'bg-[#FFFFFF]');
code = code.replace(/\btext-white\/\d+\b/g, 'text-[#FFFFFF]');
code = code.replace(/\btext-white\b/g, 'text-[#FFFFFF]');
code = code.replace(/\bborder-white\/\d+\b/g, 'border-[#FFFFFF]');
code = code.replace(/\bborder-white\b/g, 'border-[#FFFFFF]');
code = code.replace(/\bbackdrop-blur(?:-[a-z0-9]+)?\b/g, '');

fs.writeFileSync('src/App.tsx', code);
