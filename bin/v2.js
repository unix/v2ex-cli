#!/usr/bin/env node

const { version } = require('../package.json')
const commander = require('commander')

commander
  .version(version)
  .usage('<command> [options]')
  .command('show', 'display v2ex portal page')
  .command('read', 'view a topic')
  .parse(process.argv)
