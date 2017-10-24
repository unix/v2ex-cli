const commander = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')
const { storage } = require('../src/utils')
const saveLog = new ora('save cookie..')

// parse page
commander.parse(process.argv)
console.log(chalk.green.bold('Welcome, V2ER.'))

new ora().start().info('Before use, you need to add some set items..')
const promps = [{
  type: 'input',
  name: 'cookie',
  message: 'cookie:',
  validate: input => !!input
}]


// check id
;(async() => {
  const asnwers = await inquirer.prompt(promps)
  const cookie = asnwers.cookie
  if (cookie.length < 10 || !cookie.includes('A2=')) return console.log(chalk.red('bad cookie'))
  
  saveLog.start()
  await storage.write('cookie', cookie)
  saveLog.succeed('cookie saved')
})()


