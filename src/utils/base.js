const fs = require('fs')
const promisify = require('util').promisify
const childProcess = require('child_process')
const request = require('request-promise-native')
const api = 'https://www.v2ex.com/api'
const host = 'https://www.v2ex.com'

const makeHeader = async(headers = {}) => {
  return Object.assign({}, {
    'User-Agent': 'v2ex-cli',
    'Content-Type': 'application/json',
    'authorization': `Token token=`,
  }, headers)
}

const apis = {
  all: `${api}/topics/latest.json`,
  topic: `${api}/topics/show.json`,
  nodes: `${api}/nodes/all.json`,
  show: `${api}/topics/show.json`,
  recent: `${host}/recent`,
  signin: `${host}/signin`,
  host: host,
}

module.exports = {
  apis,
  makeHeader,
  request,
  readDir: promisify(fs.readdir),
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
  exists: promisify(fs.exists),
  spawnSync: childProcess.spawnSync,
}

