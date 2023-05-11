/* eslint-disable max-len */
/* eslint-disable no-restricted-properties */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const { getPackageJson, writePackageJson, editImportVersion } = require('./get-version');

const packagesAll = fs.readdirSync(`${process.cwd()}/src/components`).filter((i) => (i !== '.DS_Store'));

// version=xxx components=xxx
const argv = process.argv.slice(2) || [];

let components = '';
let version = '';
argv.forEach((item) => {
  const current = item.split('=');
  if (current.length > 1) {
    if (current[0] === 'version') version = current[1];
    if (current[0] === 'components') components = current[1];
  }
});

const packages = components ? [components] : packagesAll;

packages.forEach((item) => {
  const currentVersion = getPackageJson(item).version;
  const vs = currentVersion.split('.');
  const last = vs.pop();
  const temVersion = [...vs, Number(last) + 1];
  const lastVersion = version || `${temVersion.join('.')}`;
  writePackageJson(item, lastVersion);
  editImportVersion(item, lastVersion);
});
