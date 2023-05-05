/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

function clean(filePath) {
  fs.rmSync(filePath, { recursive: true, force: true });
}

exports.clean = clean;
