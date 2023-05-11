/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
function getPackageJson(package) {
  const packageJson = fs.readFileSync(path.resolve(cwd, `src/components/${package}/package.json`));
  return JSON.parse(packageJson);
}

function writePackageJson(package, wholeVersion) {
  const currentPackageJson = getPackageJson(package);
  currentPackageJson.version = wholeVersion;
  fs.writeFileSync(path.resolve(cwd, `src/components/${package}/package.json`), JSON.stringify(currentPackageJson, null, '\t'));
}

exports.writePackageJson = writePackageJson;
exports.getPackageJson = getPackageJson;
