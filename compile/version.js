/* eslint-disable max-len */
/* eslint-disable no-restricted-properties */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-var-requires */
const { getPackageJson, writePackageJson, editImportVersion } = require('./get-version');
const { filterPackage, version } = require('./package');

filterPackage.forEach((item) => {
  const currentVersion = getPackageJson(item).version;
  const vs = currentVersion.split('.');
  const last = vs.pop();
  const temVersion = [...vs, Number(last) + 1];
  const lastVersion = version || `${temVersion.join('.')}`;
  writePackageJson(item, lastVersion);
  editImportVersion(item, lastVersion);
});
