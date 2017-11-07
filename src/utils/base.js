const fs = require('fs')
const promisify = require('util.promisify')
const childProcess = require('child_process')
const request = require('request-promise-native')
const api = 'https://www.v2ex.com/api'
const host = 'https://www.v2ex.com'

const makeHeader = async(headers = {}) => {
  return Object.assign({}, {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (v2ex-cli; CPU v2ex-cli OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
  }, headers)
}

const noErrorPromisifyShim = func => (...args) => new Promise(r => {
  func(...args, (...results) => r(...results))
})
const makePromisify = () => {
  const nativePromisify = require('util').promisify
  if (nativePromisify && typeof nativePromisify === 'function') {
    return nativePromisify
  }
  return noErrorPromisifyShim
}
const noErrorPromisify = makePromisify()

const apis = {
  all: `${api}/topics/latest.json`,
  topic: `${api}/topics/show.json`,
  nodes: `${api}/nodes/all.json`,
  show: `${api}/topics/show.json`,
  recent: `${host}/recent`,
  signin: `${host}/signin`,
  post: `${host}/t`,
  go: `${host}/go`,
  host: host,
}

const utils = {
  readDir: promisify(fs.readdir),
  mkdir: promisify(fs.mkdir),
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
  exists: noErrorPromisify(fs.exists),
  stat: promisify(fs.stat),
  spawnSync: childProcess.spawnSync,
}

const checkAuthorization = body => {
  return !String(body).includes('<a href="/signin" class="top">登录</a>')
}

module.exports = Object.assign({
  apis,
  makeHeader,
  checkAuthorization,
  request,
}, utils)

