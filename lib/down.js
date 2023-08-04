const downloadGitRepo = require('download-git-repo');
const util = require('util');
const chalk = require('chalk');
const path = require('path');
const ora = require('ora');

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();

  try {
    const result = await fn(...args);
    spinner.succeed('下载成功 !!!');
    return result;
  } catch (error) {
    spinner.fail('下载失败！请重试', error)
  }
}

class Down {
  constructor(name, targetDir) {
    this.name = name;
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async download() {
    await wrapLoading(
      this.downloadGitRepo,
      'loading...',
      'github:Culaccino9/boke-next-cli',
      // 'direct:https://github.com/Culaccino9/boke-next-cli.git',
      path.resolve(process.cwd(), this.targetDir)),
      { clone: true },
      (err) => { console.log(err, 'err'); }
  }

  async create() {
    await this.download();

    console.log(`\r\n 成功创建项目，祝您生活愉快： ${chalk.cyan(this.name)}`)
    console.log(`\r\n ${chalk.cyan(`联系我：@bilibili 哪国莫有`)}\r\n`)
  }
}

module.exports = Down;