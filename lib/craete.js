const path = require('path');;
const fs = require('fs-extra');
const inquirer = require('inquirer');
const Down = require('./down');

module.exports = async function (...arg) {
  const [name, options] = arg;

  let ditName = name;

  // 如果没有输入名称，手动录入
  if (!ditName) {
    const temp = await inquirer.prompt([{
      name: 'project_name',
      type: 'input',
      message: '您还没有输入项目名称，请输入：',
    }]);
    ditName = `${temp.project_name}`
  }

  const cwd = process.cwd(); // 选择目录
  const targetAir = path.join(cwd, ditName);

  // 如果重名
  if (fs.existsSync(targetAir)) {
    // 如果强制创建，则移除
    if (options.force) {
      await fs.remove(targetAir);
      return
    }

    const inquirerParams = [{
      name: 'action',
      type: 'list',
      message: '目标文件目录已经存在，请选择如下操作：',
      choices: [
        { name: '替换当前目录', value: 'replace' },
        { name: '取消当前操作', value: 'cancel' }
      ]
    }];
    let inquirerData = await inquirer.prompt(inquirerParams);
    switch (inquirerData.action) {
      case 'replace':
        // 移除已存在的目录
        console.log(`\r\n 移除中...`)
        await fs.remove(targetAir)
        console.log(`\r\n 移除完成`)
        break;
      case 'cancel':
        console.log(`\r\ 取消成功`)
        return;
      default:
        break;
    }
  }

  const down = new Down(ditName, targetAir)

  down.create();
};