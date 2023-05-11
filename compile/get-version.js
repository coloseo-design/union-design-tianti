/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { packagesAll } = require('./package');

const cwd = process.cwd();
function getPackageJson(package) {
  const packageJson = fs.readFileSync(path.resolve(cwd, `src/components/${package}/package.json`));
  return JSON.parse(packageJson);
}

function writeJson(package, content) {
  fs.writeFileSync(path.resolve(cwd, `src/components/${package}/package.json`), JSON.stringify(content, null, '\t'));
}

function writePackageJson(package, wholeVersion) {
  const currentPackageJson = getPackageJson(package);
  currentPackageJson.version = wholeVersion;
  writeJson(package, currentPackageJson);
}

function editVersion(package, replacePackage, version) {
  const itemPackage = getPackageJson(package);
  if (itemPackage.dependencies[`@union-design/${replacePackage}`]) {
    Object.assign(itemPackage.dependencies, {
      [`@union-design/${replacePackage}`]: `^${version}`,
    });
    writeJson(package, itemPackage);
  }
}

function editImportVersion(package, version) {
  packagesAll.forEach((item) => {
    editVersion(item, package, version);
  });
}

exports.editImportVersion = editImportVersion;
exports.writePackageJson = writePackageJson;
exports.getPackageJson = getPackageJson;
