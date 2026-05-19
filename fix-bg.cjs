const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The backgrounds for sections and main wrappers should be #fffdf7.
// Let's replace the specific ones that act as website backgrounds.

const backgroundLinesRegexs = [
  /className="fixed inset-0 bg-\[#FFFFFF\]/g,
  /className="relative min-h-\[100dvh\] flex flex-col md:flex-row md:items-center overflow-hidden bg-\[#FFFFFF\]/g,
  /className="bg-\[#FFFFFF\] w-full relative z-10 pt-16 md:pt-20 pb-8 md:pb-10/g,
  /className="bg-\[#FFFFFF\] border-t border-gray-200 w-full min-h-screen/g,
  /className="w-full bg-\[#FFFFFF\] pb-24 md:pb-32 px-6 pt-16 md:pt-24/g,
  /className="w-full relative z-10 bg-\[#FFFFFF\]" id="cta-section"/g
];

backgroundLinesRegexs.forEach(regex => {
  code = code.replace(regex, (match) => match.replace('bg-[#FFFFFF]', 'bg-[#fffdf7]'));
});

fs.writeFileSync('src/App.tsx', code);
