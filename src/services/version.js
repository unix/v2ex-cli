const chalk = require('chalk')
const Table = require('cli-table2')
const { request } = require('../utils')
const pkg = require('../../package.json')

module.exports = {
  check: async() => {
    const table = new Table({ chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' }})
    const currentVersion = pkg.version
    const api = pkg.repository.update
    const githubPkg = JSON.parse(await request(api)) || {}
    const latestVersion = githubPkg.version
    if (latestVersion && latestVersion !== currentVersion) {
      console.log('\n')
      table.push(
        [`   V2EX CLI ${latestVersion} has been released`],
        [`run [${chalk.green('npm update v2ex-cli -g')}] to update`],
      )
      console.log(String(table))
      console.log('\n')
    }
  },
  
}
