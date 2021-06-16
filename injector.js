const fs = require('fs');
const packageConfig = require('./package.json');

const args = process.argv.slice(2);
const parsedArgs = args.reduce((p, c) => {
  const [key, value] = c.split('=');
  Object.assign(p, {
    [key]: value,
  });
  return p;
}, {});

const config = {
  publishConfig: {
    production: 'http://ccp.tianti.tg.unicom.local/artifactory/api/npm/sjxt-npm-virtual/',
    development: 'https://nexus.coloseo.cn/repository/npm-hosted/',
  },
  npm: {
    filename: '.npmrc',
    content: {
      production: 'registry=http://ccp.tianti.tg.unicom.local/artifactory/api/npm/sjxt-npm-virtual/',
      development: `registry=https://nexus.coloseo.cn/repository/npm-all/
email=devops@coloseo.cn
always-auth=true
_auth="bnBtOmNvbG9zZW8xMjM="`,
    },
  },
  yarn: {
    filename: '.yarnrc',
    content: {
      production: 'registry "http://ccp.tianti.tg.unicom.local/artifactory/api/npm/sjxt-npm-virtual/"',
      development: `registry "https://nexus.coloseo.cn/repository/npm-all/"
email "devops@coloseo.cn"
always-auth true
_auth "bnBtOmNvbG9zZW8xMjM="`,
    },
  },
};
const { env } = parsedArgs;
if (!env) {
  throw new Error('请传入env参数');
}
fs.writeFileSync(config.npm.filename, config.npm.content[env]);
fs.writeFileSync(config.yarn.filename, config.yarn.content[env]);
Object.assign(packageConfig, {
  publishConfig: {
    registry: config.publishConfig[env],
  },
});
// fs.writeFileSync('package.json', JSON.stringify(packageConfig));
try {
  fs.unlinkSync('yarn.lock');
  fs.unlinkSync('package-lock.json');
} catch (e) {
}
