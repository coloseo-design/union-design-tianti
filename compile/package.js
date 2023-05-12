/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

// --version=xxx --components=xxx
const argv = process.argv.slice(2) || [];

let components = '';
let version = '';
argv.forEach((item) => {
  const current = item.split('=');
  if (current.length > 1) {
    if (current[0] === '--version') version = current[1];
    if (current[0] === '--components' && current[1] !== 'every' && current[1] === 'one') components = current[1];
  }
});

const packagesAll = fs.readdirSync(`${process.cwd()}/src/components`).filter((i) => !(i.endsWith('.ts') || i.endsWith('.less') || i === '.DS_Store'));

const packages = components ? [components] : packagesAll;

exports.packages = ['style', ...packages.filter((i) => i !== 'col' && i !== 'row')];
exports.filterPackage = packages;
exports.packagesAll = packagesAll;
exports.version = version;
