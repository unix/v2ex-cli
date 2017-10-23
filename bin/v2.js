#!/usr/bin/env node

const { version } = require('../package.json')
const commander = require('commander')

commander
  .version(version)
  .usage('<command> [options]')
  .command('show [page]', 'display v2ex portal page')
  .command('read [id]', 'view a topic')
  .command('nodes [name]', 'view all nodes')
  .command('reply', 'create a reply')
  .command('install ', 'edit config and init')
  // .command('login', 'login')
  .command('go [page_number]', 'pagination, [j]: next page, [l]: previous page')
  .parse(process.argv)

  
