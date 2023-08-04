#! /usr/bin/env node

const program = require('commander');
const figlet = require('figlet');
const chalk = require('chalk');

program
  .command('create [name]')
  .description('创建一个新项目（create a new project）')
  .option('-f, --force', 'overwrite target directory if it exists')
  .action((...arg) => {
    require('../lib/craete')(...arg)
  })

// program
//   .command('config [value]')
//   .description('修改和设置配置（inspect & modify the config）')
//   .option('-g ,--get <path>', 'get value from options')
//   .option('-s, --set <path> <value>')
//   .option('-d, --delete <path>', 'delete option from config')
//   .action((...arg) => {
//     // TOOD
//     console.log(arg, 'arg,options');
//   })

program.on('--help', () => {
  console.log('\r\n' + figlet.textSync('boke', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  }));
  console.log(`\r\n ${chalk.cyan(`联系我：@bilibili 哪国莫有`)}\r\n`)
})

program
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

// 解析用户执行命令传入参数
program.parse(process.argv);