const chalk = require('chalk')
const Table = require('cli-table2')
const { request } = require('../utils')
const pkg = require('../../package.json')

const getVersion = defaultVersion => {
  const api = pkg.repository.update
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      resolve(`{ "version": "${defaultVersion}" }`)
    }, 8000)
    request(api).then(res => {
      clearTimeout(timer)
      resolve(res)
    }, () => ({})).catch(e => reject(e))
  })
}

const translateVersion = version => {
  return version.match(/\d+/g).reduce((p, n) => p + n, '')
}

const versionNeedUpdate = (latest, current) => {
  if (Number.isNaN(+latest) || Number.isNaN(+current)) {
    return false
  }
  return +latest > +current
}

module.exports = {
  check: async(log) => {
    const table = new Table({ chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' }})
    const currentVersion = pkg.version
    try {
      const githubPkg = JSON.parse(await getVersion(currentVersion)) || {}
      log.stop()
      const latestVersion = githubPkg.version
      const latest = translateVersion(latestVersion)
      const current = translateVersion(currentVersion)
      if (latestVersion && versionNeedUpdate(latest, current)) {
        console.log('\n')
        table.push(
          [`V2EX CLI ${latestVersion} has been released`],
          [`run [${chalk.green('npm i v2ex-cli -g')}] to update`],
        )
        console.log(String(table))
        console.log('\n')
      }
    } catch (e) {
      log.stop()
    }
  },
  
}
