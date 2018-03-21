const commander = require('commander')
const chalk = require('chalk')
const updateNotifier = require('update-notifier')
const pkg = require('../package.json')

updateNotifier({pkg}).notify()

const v = process.version.match(/\d+/g)[0]
if (v < 5) {
  console.log(chalk.yellow('require NodeJS 8.x+ version'))
  console.log(chalk.yellow('you need upgrade NodeJS\n'))
  console.log('progress over stability ———— DHH')
  process.exit(1)
}

commander
  .version(pkg.version)
  .usage('<command> [options]')
  .command('show [page]', 'display v2ex portal page')
  .command('read [id]', 'view a topic')
  .command('nodes [name]', 'view all nodes')
  .command('cache', 'show cache')
  .command('reply', 'create a reply')
  .command('install ', 'edit config and init')
  .command('implode ', 'destroy self')
  // .command('login', 'login')
  .command('go [page_number]', 'pagination')
  .parse(process.argv)

  
