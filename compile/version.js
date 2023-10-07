/* eslint-disable max-len */
/* eslint-disable no-restricted-properties */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-var-requires */
const {
  getPackageJson,
  writePackageJson,
  editImportVersion,
  writeJson,
} = require('./get-version');
const { filterPackage, version } = require('./package');

const rootPackage = getPackageJson('', true);

// 在命令行后面加 --components=xxx 表示只修改这个包的version， 加 --version=xxx 表示修改版本号为xxx

const allP = [...filterPackage, 'row', 'col'];

allP.forEach((item, index) => {
  const currentVersion = getPackageJson(item).version;
  const vs = currentVersion.split('.');
  const last = vs.pop();
  const temVersion = [...vs, Number(last) + 1];
  const lastVersion = version || `${temVersion.join('.')}`;
  writePackageJson(item, lastVersion);
  editImportVersion(item, lastVersion);
  if (rootPackage && rootPackage.dependencies[`@union-design/${item}`]) {
    Object.assign(rootPackage.dependencies, {
      [`@union-design/${item}`]: `^${lastVersion}`,
    });
  }
  if (index === (allP || []).length - 1) {
    writeJson('', rootPackage, true);
  }
});
