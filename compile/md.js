/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { src, dest } = require('gulp');
/**
 *
 * @param {boolean} modules modules true to es dir , or lib dir
 */
const rootPath = process.cwd();
function md(format, item) {
  const currentPath = item ? path.resolve(rootPath, `src/components/${item}`) : path.resolve(rootPath);
  const outputPath = path.resolve(currentPath, format);
  const srcPath = item ? currentPath : `${rootPath}/src/components`;
  return src([
    // path.resolve(currentPath, '*.md'),
    path.join(srcPath, '**/*.md'),
    `!${path.join(`${srcPath}/**/es`, '**/*.md')}`,
    `!${path.join(`${srcPath}/**/lib`, '/**/*.md')}`,
    `!${path.join(`${srcPath}/**/node_modules`, '/**/*.md')}`,
  ]).pipe(dest(outputPath));
}

exports.md = md;
