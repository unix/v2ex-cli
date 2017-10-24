const commander = require('commander')
const inquirer = require('inquirer')
const Table = require('cli-table2')
const chalk = require('chalk')
const ora = require('ora')
const { storage } = require('../src/utils')
const { check } = require('../src/services/version')
const saveLog = new ora('save cookie..')

// parse page
commander.parse(process.argv)
const table = new Table({ chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' }})
table.push(
  [`                ${chalk.green.bold('HELLO, V2ER.')}                `],
)
console.log(String(table))

new ora().start().info('Before use, you need to add some set items..')
const promps = [{
  type: 'input',
  name: 'cookie',
  message: 'cookie:',
  validate: input => !!input
}]


// check id
;(async() => {
  // check version
  await check()
  
  // run inquirer
  const asnwers = await inquirer.prompt(promps)
  const cookie = asnwers.cookie
  if (cookie.length < 10 || !cookie.includes('A2=')) return console.log(chalk.red('bad cookie'))
  
  saveLog.start()
  await storage.write('cookie', cookie)
  saveLog.succeed('cookie saved')
})()


