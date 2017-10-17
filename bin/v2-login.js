require('console-png').attachTo(console)
const commander = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const inquirer = require('inquirer')
const { storage, writeFile } = require('../src/utils')
const { create, generateOnce, download } = require('../src/pages/sessions')


const promps = [{
  type: 'input',
  name: 'username',
  message: 'username',
  validate: input => !!input
}, {
  type: 'password',
  name: 'pass',
  message: 'password:',
  validate: input => !!input
}]

;(async() => {
  const log = new ora('verify link..').start()
  try {
    const { cookie, result } = await generateOnce()
    log.clear()
    const verify = result.find(key => key.name === 'verify')
    const asnwers = await inquirer.prompt(promps)
    if (verify) {
      log.text = 'fetch verification Code..'
      const a = await download(verify.img, cookie)
      log.clear()
      console.log(123, typeof a, a)
      // console.png(verify.img)
    }
  } catch (e) {
    log.fail(e)
  }
  
})()
