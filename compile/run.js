/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk');
const gulp = require('gulp');
const tasks = require('./gulpfile');

const tempT = (process.argv[2] || '').split('=') || [];
const taskType = tempT.length > 1 ? tempT[1] : 'every';
const taskMap = {
  every: '编译每一个组件包',
  one: '编译所有组件总包',
  [`${taskType}`]: `编译${taskType}包`,
};

process.stdout.write(chalk.green(`run task [${taskMap[taskType]}], please wait...\n`));
tasks[taskType].call(gulp, (error) => {
  if (!error) {
    process.stdout.write(chalk.green(`task [${taskMap[taskType]}] done.\n`));
  } else {
    gulp.emit('error', { task: taskType, error });
  }
});
