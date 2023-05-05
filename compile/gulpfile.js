/* eslint-disable @typescript-eslint/no-var-requires */
const { parallel, series } = require('gulp');
const path = require('path');
const { packages } = require('./package');
const { lessCompile } = require('./less');
const { md } = require('./md');
const { demo } = require('./demo');
const { dts } = require('./type');
const { clean } = require('./clean');

const tempT = (process.argv[2] || '').split('=') || [];
const taskType = tempT.length > 1 ? tempT[1] : 'single';

if (taskType === 'single') {
  const esTasks = [];
  const libTasks = [];
  packages.forEach((item) => {
    const dist = path.resolve(process.cwd(), `src/components/${item}`);
    clean(path.resolve(dist, 'es'));
    clean(path.resolve(dist, 'lib'));
    const t = series(
      parallel(() => dts('es', item)),
      parallel(() => lessCompile('es', item)),
      parallel(() => md('es', item)),
      parallel(() => demo('es', item)),
    );
    const t1 = series(
      parallel(() => dts('lib', item)),
      parallel(() => lessCompile('lib', item)),
      parallel(() => md('lib', item)),
      parallel(() => demo('lib', item)),
    );
    esTasks.push(t);
    libTasks.push(t1);
  });
  const single = series(...esTasks, ...libTasks);
  exports.single = single;
} else {
  clean(path.resolve(process.cwd(), 'es'));
  clean(path.resolve(process.cwd(), 'lib'));
  const allEsTask = series(
    parallel(() => dts('es')),
    parallel(() => lessCompile('es')),
    parallel(() => md('es')),
    parallel(() => demo('es')),
  );
  const allLibTask = series(
    parallel(() => dts('lib')),
    parallel(() => lessCompile('lib')),
    parallel(() => md('lib')),
    parallel(() => demo('lib')),
  );
  const all = series(
    allEsTask,
    allLibTask,
  );
  exports.all = all;
}
