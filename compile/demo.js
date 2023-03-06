/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { src, dest } = require('gulp');

/**
 *
 * @param {boolean} modules modules true to es dir , or lib dir
 */
const rootPath = process.cwd();
function demo(format, item) {
  const currentPath = item ? path.resolve(rootPath, `src/components/${item}`) : path.resolve(rootPath);
  const outputPath = path.resolve(currentPath, format);
  const srcPath = item ? currentPath : `${rootPath}/src/components`;
  return src([
    path.join(srcPath, '**/demo.tsx'),
    `!${path.join(srcPath, 'es/**/demo.tsx')}`,
    `!${path.join(srcPath, 'lib/**/demo.tsx')}`,
    `!${path.join(srcPath, 'node_modules/**/demo.tsx')}`,
  ]).pipe(dest(outputPath));
}

exports.demo = demo;
