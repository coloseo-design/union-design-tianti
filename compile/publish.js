/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require('child_process');
const http = require('http');
const https = require('https');
const fs = require('fs');
const { filterPackage } = require('./package');
const { getPackageJson } = require('./get-version');

const npm = fs.readFileSync('.npmrc', 'utf-8');

const registry = npm.indexOf('https://') ? 'https://npm.coloseo.online/' : 'http://ccp.tianti.tg.unicom.local/artifactory/api/npm/sjxt-npm-virtual/';

const getVersion = (packageName, version) => {
  const url = `${registry}-/package/${packageName}/dist-tags`;
  const urlObject = new URL(url);
  const request = urlObject.protocol === 'https:' ? https : http;
  return new Promise((resolve, reject) => {
    request.get(url, (res) => {
      res.on('data', (data) => {
        const result = JSON.parse(data);
        if (typeof result === 'string') {
          reject(new Error(result));
        }
        if (result.error) {
          reject(new Error(result.error));
        }
        if (result && result.latest) {
          if (version === result.latest) {
            const name = packageName.split('%2F');
            reject(new Error(`${name[1]}组件${version}版本已在服务器存在`));
          } else {
            resolve(result);
          }
        }
      });
      res.on('error', (e) => {
        reject(e);
      });
    });
  });
};

filterPackage.forEach((item) => {
  const packageJson = getPackageJson(item);
  const { version } = packageJson;
  const packageName = `@union-design%2F${item}`;
  getVersion(packageName, version).then(() => {
    const pd = spawn('npm', ['publish', `-workspace=src/components/${item}`]);
    pd.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    pd.stderr.on('data', (data) => {
      console.log(`${data}`);
    });
  }).catch((e) => {
    console.error(e);
  });
});
