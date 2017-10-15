const fs = require('fs')
const promisify = require('util').promisify
const childProcess = require('child_process')
const request = require('request-promise-native')
const host = 'https://www.v2ex.com/api'
const commander = require('commander')

const parse = () => {
  commander.parse(process.argv)
  if (commander.args.length < 1) return commander.help()
}

const makeHeader = async() => {
  return {
    'User-Agent': 'v2ex-cli',
    'Content-Type': 'application/json',
    'authorization': `Token token=`,
  }
}

const apis = {
  all: `${host}/topics/latest.json`,
  topic: `${host}/topics/show.json`,
}

module.exports = {
  apis,
  parse,
  makeHeader,
  request,
  readDir: promisify(fs.readdir),
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
  exists: promisify(fs.exists),
  spawnSync: childProcess.spawnSync,
}

