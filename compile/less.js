/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const less = require('less');
const { src, dest } = require('gulp');
const through2 = require('through2');
const NpmImportPlugin = require('less-plugin-npm-import');
const chalk = require('chalk');
const rucksack = require('rucksack-css');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

const postcssConfig = {
  plugins: [
    rucksack(),
    autoprefixer({
      overrideBrowserslist: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9',
      ],
      flexbox: 'no-2009',
    }),
  ],
};

/**
 *
 * @param {boolean} modules modules true to es dir , or lib dir
 */

const lessCompile = (modules, item) => {
  const currentPath = item ? path.resolve(process.cwd(), `src/components/${item}`) : path.resolve(process.cwd(), 'src/components');
  const lessDir = [
    path.join(currentPath, '/**/*.less'),
    `!${path.join(`${currentPath}/**/es`, '/**/*.less')}`,
    `!${path.join(`${currentPath}/**/lib`, '/**/*.less')}`,
  ];
  const dist = item ? currentPath : path.resolve(process.cwd());
  const outputPath = path.resolve(dist, modules);
  return src(lessDir)
    .pipe(through2.obj(function transformer(file, encoding, next) {
      const fileString = file.contents.toString(encoding);
      const res = fileString.replaceAll('../../style', '@union-design/style/es');
      file.contents = Buffer.from(res);
      this.push(file.clone());
      if (
        file.path.match(/(\/|\\)styles?(\/|\\)index\.less$/)
      || file.path.match(/(\/|\\)style(\/|\\)v2-compatible-reset\.less$/)
      || file.path.match(/(\/|\\)index\.less$/)
      ) {
        const data = file.contents.toString(encoding);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const resolvedLessFile = path.resolve(process.cwd(), file.path);
        less.render(data, {
          paths: [path.dirname(resolvedLessFile)],
          filename: resolvedLessFile,
          plugins: [new NpmImportPlugin({ prefix: '~' })],
          javascriptEnabled: true,
        }).then((result) => {
          const contents = postcss(postcssConfig.plugins).process(result.css, { from: undefined });
          Object.assign(file, {
            contents: Buffer.from(contents.css),
            path: file.path.replace(/\.less$/, '.css'),
          });
          self.push(file);
          next();
        })
          .catch((e) => {
            process.stdout.write(chalk.red(e.message));
          });
      } else {
        next();
      }
    }))
    .pipe(dest(outputPath));
};

exports.lessCompile = lessCompile;
