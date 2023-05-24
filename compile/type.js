/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const path = require('path');
const babel = require('gulp-babel');
const through2 = require('through2');
const ts = require('gulp-typescript');
const merge = require('merge2');
const getBabelConfig = require('./babel');

const tsDefaultReporter = ts.reporter.defaultReporter();
const srcs = (src) => {
  const list = [
    path.join(src, '/**/*.tsx'),
    path.join(src, '/**/*.ts'),
    `!${path.join(src, '/demo.tsx')}`,
    `!${path.join(src, '/demo.ts')}`,
    `!${path.join(src, 'lib/**/*.tsx')}`,
    `!${path.join(src, 'lib/**/*.ts')}`,
    `!${path.join(src, 'es/**/*.tsx')}`,
    `!${path.join(src, 'es/**/*.ts')}`,
    `!${path.join(src, 'src/**/*.tsx')}`,
    `!${path.join(src, 'src/**/*.ts')}`,
    `!${path.join(src, 'node_modules/**/*.ts')}`,
    `!${path.join(src, 'node_modules/**/*.tsx')}`,
  ];
  return list;
};

const allSrcs = (src) => ([
  path.join(src, '/**/*.tsx'),
  path.join(src, '/**/*.ts'),
  `!${path.join(src, '**/*/demo.tsx')}`,
  `!${path.join(src, '**/*/demo.ts')}`,
  `!${path.join(src, '/**/lib', '/**/*.tsx')}`,
  `!${path.join(`${src}/**/lib`, '/**/*.ts')}`,
  `!${path.join(`${src}/**/es`, '/**/*.tsx')}`,
  `!${path.join(`${src}/**/es`, '/**/*.ts')}`,
  `!${path.join(`${src}/**/src`, '/**/*.tsx')}`,
  `!${path.join(`${src}/**/src`, '/**/*.ts')}`,
  `!${path.join(`${src}/**/node_modules`, '/**/*.ts')}`,
  `!${path.join(`${src}/**/node_modules`, '/**/*.tsx')}`,
]);

const tsCompileConfig = (rootDir) => ({
  noUnusedParameters: false,
  noUnusedLocals: false,
  strictNullChecks: false,
  skipDefaultLibCheck: true,
  strict: false,
  target: 'es6',
  jsx: 'preserve',
  moduleResolution: 'node',
  declaration: true,
  allowSyntheticDefaultImports: true,
  rootDir: path.resolve(process.cwd(), 'src'),
  experimentalDecorators: true,
});

function dts(format, item) {
  const src = item ? path.resolve(process.cwd(), `src/components/${item}`) : path.resolve(process.cwd(), 'src/components');
  const dist = item ? path.resolve(process.cwd(), `src/components/${item}/`) : path.resolve(process.cwd());
  const tsResult = gulp.src(item ? srcs(src) : allSrcs(src))
    .pipe(through2.obj((file, encoding, next) => {
      if (file.isBuffer()) {
        const content = file.contents.toString(encoding);
        // let res = content;
        // if (file.path.endsWith('styles/index.tsx') || file.path.endsWith('styles/index.ts')) {
        //   res = content.replaceAll('styles/index', 'es/styles/index');
        // }
        const transformed = `// @ts-nocheck \n ${content}`;
        file.contents = Buffer.from(content);
        next(null, file);
      } else {
        next(null, file);
      }
    }))
    .pipe(ts(tsCompileConfig(src), tsDefaultReporter)); // translate to js
  return merge([
    tsResult.js
      // eslint-disable-next-line no-unneeded-ternary
      .pipe(babel(getBabelConfig(format === 'es' ? false : undefined))) // babel
      .pipe(through2.obj(function transformer(file, enc, next) {
        Object.assign(file, {
          path: file.path.replace(/\.[jt]sx$/, '.js'),
        });
        this.push(file);
        next();
      }))
      .pipe(gulp.dest(path.resolve(dist, format))),
    tsResult.js.pipe(babel(getBabelConfig(format === 'es' ? false : undefined))) // babel
      .pipe(through2.obj(function cb(file, encoding, next) {
        this.push(file.clone());
        if (file.path.match(/(\/|\\)styles?(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding);
          const transform = content
            .replace(/\/style\/?'/g, "/style/css'")
            .replace(/\/style\/?"/g, '/style/css"')
            .replace(/\.less/g, '.css');
          file.contents = Buffer.from(transform);
          file.path = file.path.replace(/index\.js/, 'css.js');
          this.push(file);
          next();
        } else {
          next();
        }
      })).pipe(gulp.dest(path.resolve(dist, format))),
    tsResult.dts.pipe(gulp.dest(path.resolve(dist, format))),
  ]);
}

exports.dts = dts;
