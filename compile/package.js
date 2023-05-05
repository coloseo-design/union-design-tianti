/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const currentPackages = process.env.npm_config_packages?.split('-') || [];
// 单独编译某一个包

const packagesALl = fs.readdirSync(`${process.cwd()}/src/components`).filter((i) => (i !== '.DS_Store'));

const packages = currentPackages.length > 0 ? currentPackages : packagesALl.filter((i) => !(i.endsWith('.ts') || i.endsWith('.less') || i === '.DS_Store'));

exports.packages = [...packages.filter((i) => i !== 'col' && i !== 'row')];
// exports.packages = [
//   // 'style',
//   // 'affix',
//   // 'icon',
//   // 'icon', 'alert', 'anchor', 'auto-complete', 'avatar',
//   // 'back-top', 'badge', 'base-component',
//   // 'breadcrumb',
//   // 'button',
//   // 'calendar', 'card', 'carousel', 'cascader', 'checkbox', 'col', 'collapse', 'date-picker',
//   // 'dropdown', 'select', 'input', 'input-number', 'top-nav', 'side-nav', 'style',
//   // 'tabs', 'tag',
//   // 'table',
//   // 'button',
//   // 'modal',
//   // 'utils',
//   // 'grid',
// ];
