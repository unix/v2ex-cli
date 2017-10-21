#!/usr/bin/env node

const { version } = require('../package.json')
const commander = require('commander')

commander
  .version(version)
  .usage('<command> [options]')
  .command('show [page]', 'display v2ex portal page')
  .command('read [id]', 'view a topic')
  .command('nodes [name]', 'view all nodes')
  .command('login', 'login')
  .command('next', 'next page')
  .command('pre', 'previous page')
  .parse(process.argv)

  
