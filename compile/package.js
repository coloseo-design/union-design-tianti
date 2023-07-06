/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

// --version=xxx --components=xxx
const argv = process.argv.slice(2) || [];

let components = '';
let version = '';
let isAll = false;
argv.forEach((item) => {
  const current = item.split('=');
  if (current.length > 1) {
    if (current[0] === '--version') version = current[1];
    if (current[0] === '--components' && current[1] !== 'every' && current[1] !== 'one') components = current[1];
    if (current[0] === '--components' && current[1] === 'one') {
      isAll = true;
    }
  }
});

const packagesAll = fs.readdirSync(`${process.cwd()}/src/components`).filter((i) => i !== '.DS_Store');
const subPackage = packagesAll.filter((i) => !i.endsWith('.ts') && !i.endsWith('.less') && i !== 'col' && i !== 'row');

const packages = components ? [components] : (isAll ? packagesAll : subPackage);

exports.packages = ['style', ...packages];
exports.filterPackage = packages;
exports.packagesAll = packagesAll;
exports.version = version;
