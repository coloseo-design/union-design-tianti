/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { packagesAll } = require('./package');

const cwd = process.cwd();
function getPackageJson(package, isRoot) {
  const packagePath = isRoot ? path.resolve(cwd, 'package.json') : path.resolve(cwd, `src/components/${package}/package.json`);
  const packageJson = fs.readFileSync(packagePath);
  if (packagePath) {
    return JSON.parse(packageJson);
  }
  return {};
}

function writeJson(package, content, isRoot) {
  const packagePath = isRoot ? path.resolve(cwd, 'package.json') : path.resolve(cwd, `src/components/${package}/package.json`);
  fs.writeFileSync(packagePath, JSON.stringify(content, null, '\t'));
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
  packagesAll.filter((i) => !i.endsWith('.less') && !i.endsWith('ts')).forEach((item) => {
    editVersion(item, package, version);
  });
}

exports.editImportVersion = editImportVersion;
exports.writePackageJson = writePackageJson;
exports.getPackageJson = getPackageJson;
exports.writeJson = writeJson;
