/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk');
const gulp = require('gulp');
const tasks = require('./gulpfile');
const { packagesAll } = require('./package');

const tempT = (process.argv[2] || '').split('=') || [];
const taskType = tempT.length > 1 ? tempT[1] : 'all';
const taskMap = {
  [`${taskType}`]: `编译${taskType}包`,
  every: '编译每一个组件分包',
  one: '编译总包',
  all: '编译分包和总包',
};

if (!['every', 'one', 'all'].includes(taskType) && !packagesAll.includes(taskType)) {
  process.stdout.write(chalk.red('查看--components后面的组件是否拼写错误 \n'));
} else {
  process.stdout.write(chalk.green(`run task [${taskMap[taskType]}], please wait...\n`));
  tasks[taskType].call(gulp, (error) => {
    if (!error) {
      process.stdout.write(chalk.green(`task [${taskMap[taskType]}] done.\n`));
    } else {
      gulp.emit('error', { task: taskType, error });
    }
  });
}
