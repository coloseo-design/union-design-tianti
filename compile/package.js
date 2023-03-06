/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const currentPackages = process.env.npm_config_packages?.split('-') || [];
// 单独编译某一个包

const packagesALl = fs.readdirSync(`${process.cwd()}/src/components`).filter((i) => (i !== '.DS_Store'));

const packages = currentPackages.length > 0 ? currentPackages : packagesALl.filter((i) => !(i.endsWith('.ts') || i.endsWith('.less') || i === '.DS_Store'));

/* date-picker, table, skeleton */
exports.packages = packages;
