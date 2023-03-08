/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('./src/components');

files.forEach((item) => {
  if (item !== '.DS_Store' && item !== 'index.less' && item !== 'index.ts') {
    const srcPath = path.resolve(process.cwd(), `src/components/${item}/src/index.tsx`);
    const demoPath = path.resolve(process.cwd(), `src/components/${item}/demo.tsx`);
    if (fs.existsSync(demoPath)) {
      if (fs.existsSync(srcPath)) {
        fs.rmSync(srcPath, { recursive: true, force: true });
      }
      const data = `import React from 'react';
import ReactDOM from 'react-dom';
import Demo from '../demo';

ReactDOM.render(<div><Demo /></div>, document.querySelector('#root'));
`;
      fs.writeFileSync(srcPath, data);
    }
  }
});
