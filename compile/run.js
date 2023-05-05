/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk');
const gulp = require('gulp');
const tasks = require('./gulpfile');

const tempT = (process.argv[2] || '').split('=') || [];
const taskType = tempT.length > 1 ? tempT[1] : 'single';
process.stdout.write(chalk.green(`run task [${taskType}], please wait...\n`));
tasks[taskType].call(gulp, (error) => {
  if (!error) {
    process.stdout.write(chalk.green(`task [${taskType}] done.\n`));
  } else {
    gulp.emit('error', { task: taskType, error });
  }
});
