/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('./src/components');

files.forEach((item) => {
  if (item !== '.DS_Store' && item !== 'index.less' && item !== 'index.ts') {
    const content = 'registry=https://npm.coloseo.online/';
    const file = path.resolve(process.cwd(), `src/components/${item}/.npmrc`);
    if (fs.existsSync(file)) {
      fs.rmSync(file);
    }
    fs.writeFileSync(file, content);
  }
});
