/* eslint-disable @typescript-eslint/no-var-requires */
const { parallel, series } = require('gulp');
const path = require('path');
const { packages, packagesAll } = require('./package');
const { lessCompile } = require('./less');
const { md } = require('./md');
const { demo } = require('./demo');
const { dts } = require('./type');
const { clean } = require('./clean');

const tempT = (process.argv[2] || '').split('=') || [];
const taskType = tempT.length > 1 ? tempT[1] : 'all';
const task = (item) => {
  const es = series(
    parallel(() => dts('es', item)),
    parallel(() => lessCompile('es', item)),
    parallel(() => md('es', item)),
    parallel(() => demo('es', item)),
  );
  const lib = series(
    parallel(() => dts('lib', item)),
    parallel(() => lessCompile('lib', item)),
    parallel(() => md('lib', item)),
    parallel(() => demo('lib', item)),
  );
  return { es, lib };
};

const everyTask = () => {
  const esTasks = [];
  const libTasks = [];
  packages.forEach((item) => {
    const dist = path.resolve(process.cwd(), `src/components/${item}`);
    clean(path.resolve(dist, 'es'));
    clean(path.resolve(dist, 'lib'));
    clean(path.resolve(dist, 'node_modules'));
    const { es, lib } = task(item);
    esTasks.push(es);
    libTasks.push(lib);
  });
  const every = series(...esTasks, ...libTasks);
  return every;
};

const oneTask = () => {
  clean(path.resolve(process.cwd(), 'es'));
  clean(path.resolve(process.cwd(), 'lib'));
  const { es, lib } = task();
  const one = series(es, lib);
  return one;
};

if (taskType === 'every' || packagesAll.includes(taskType)) {
  const every = everyTask();
  exports[taskType] = every;
} else if (taskType === 'one') {
  const one = oneTask();
  exports.one = one;
} else {
  const every = everyTask();
  const one = oneTask();
  exports.all = series(every, one);
}
