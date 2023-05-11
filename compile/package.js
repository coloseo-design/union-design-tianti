/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const currentPackages = process.env.npm_config_packages?.split('-') || [];
// 单独编译某一个包

const packagesAll = fs.readdirSync(`${process.cwd()}/src/components`).filter((i) => !(i.endsWith('.ts') || i.endsWith('.less') || i === '.DS_Store'));

const packages = currentPackages.length > 0 ? currentPackages : packagesAll;

exports.packages = ['style', ...packages.filter((i) => i !== 'col' && i !== 'row')];
exports.packagesAll = packagesAll;
