const chalk = require('chalk')
const Table = require('cli-table3')
const inquirer = require('inquirer')
const ora = require('ora')
const { spawnSync } = require('../src/utils')

const promps = [{
  type: 'input',
  name: 'continue',
  message: 'continue: Y / N(default)',
  validate: input => !!input,
}]

;(async() => {
  const table = new Table({ chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' }})
  table.push(
    [`                   ${chalk.red('Bye, v2er')}                   `],
  )
  console.log(String(table))
  new ora().info('v2ex-cli will be removed!')
  const asnwers = await inquirer.prompt(promps)
  const toggle = String(asnwers.continue).toLowerCase() === 'y'
  if (!toggle) return console.log(chalk.yellow('cancelled'))
  
  spawnSync('npm', ['rm', 'v2ex-cli', '-g'])
})()
