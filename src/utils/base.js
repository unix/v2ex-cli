const fs = require('fs')
const promisify = require('util').promisify
const request = require('request-promise-native')

const makeHeader = async() => {
  return {
    'User-Agent': 'v2ex-cli',
    'Content-Type': 'application/json',
    'authorization': `Token token=`,
  }
}
const apis = {
  all: 'https://www.v2ex.com/api/topics/latest.json',
  
}

module.exports = {
  apis,
  makeHeader,
  request,
  readDir: promisify(fs.readdir),
}

