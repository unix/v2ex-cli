const chalk = require('chalk')
const { request } = require('../utils')
const pkg = require('../../package.json')

module.exports = {
  check: async() => {
    const currentVersion = pkg.version
    const api = pkg.repository.update
    const githubPkg = JSON.parse(await request(api)) || {}
    const latestVersion = githubPkg.version
    if (latestVersion && latestVersion !== currentVersion) {
      console.log(chalk.yellow(`V2EX CLI ${latestVersion} has been released.\n`))
      console.log(chalk.yellow(`run [${chalk.green('npm update v2ex-cli -g')}] to update.\n`))
    }
  },
  
}
