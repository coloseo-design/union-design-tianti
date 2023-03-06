/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk');
const gulp = require('gulp');
const path = require('path');
const tasks = require('./gulpfile');
const { clean } = require('./clean');

const tempT = (process.argv[2] || '').split('=') || [];
const taskType = tempT.length > 1 ? tempT[1] : 'single';
if (taskType === 'all') {
  clean(path.resolve(process.cwd(), 'es'));
  clean(path.resolve(process.cwd(), 'lib'));
}
process.stdout.write(chalk.green(`run task [${taskType}], please wait...\n`));
tasks[taskType].call(gulp, (error) => {
  if (!error) {
    process.stdout.write(chalk.green(`task [${taskType}] done.\n`));
  } else {
    gulp.emit('error', { task: taskType, error });
  }
});
