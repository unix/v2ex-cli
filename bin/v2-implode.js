const chalk = require('chalk')
const inquirer = require('inquirer')
const { spawnSync } = require('../src/utils')

const promps = [{
  type: 'input',
  name: 'continue',
  message: 'continue: Y / N(default)',
  validate: input => !!input
}]

;(async() => {
  console.log(chalk.red('v2ex-cli will be removed!'))
  const asnwers = await inquirer.prompt(promps)
  const toggle = String(asnwers.continue).toLowerCase() === 'y'
  if (!toggle) return console.log(chalk.yellow('cancelled'))
  
  spawnSync('npm', ['rm', 'v2ex-cli', '-g'])
})()
