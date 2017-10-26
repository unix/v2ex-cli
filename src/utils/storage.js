const { exists, spawnSync, writeFile, readFile, mkdir } = require('./base')
const init = async() => {
  if (!await exists('./temp')) {
    await mkdir('./temp/')
  }
}

const storage = {
  set: async(key, value) => {
    await init()
    const path = `./temp/${key}.txt`
    if (await exists(path)) spawnSync('rm', [path])
    await writeFile(path, JSON.stringify(value), 'utf-8')
  },
  
  get: async(key) => {
    const path = `./temp/${key}.txt`
    if (!await exists(path)) return null
    let result = {}
    try {
      result = JSON.parse(await readFile(path, 'utf-8'))
    } catch (e) {
      result = {}
    }
    return result
  },
  
  write: async(name, content, encoding = 'utf-8') => {
    await init()
    const path = `./temp/${name}`
    if (await exists(path)) spawnSync('rm', [path])
    await writeFile(path, content, encoding)
    return path
  },
  
  read: async(name) => {
    const path = `./temp/${name}`
    if (!await exists(path)) return null
    return await readFile(path, 'utf-8')
  },
}

const histroy = {
  get: async(key = 'post') => {
    const record = await storage.get('histroy')
    if (!record || !record[key]) return null
    return record[key]
  },
  
  add: async(key, value) => {
    const record = await storage.get('histroy') || {}
    const next = Object.assign({}, record, { [String(key)]: value })
    await storage.set('histroy', next)
  },
}

const getCookie = async(silent = false) => {
  const cookie = await storage.read('cookie')
  if (!cookie && !silent) {
    throw 'cookie not found, try run [v2 install] set it.'
  }
  return cookie || ''
}

module.exports = {
  storage: Object.assign(storage, { getCookie }),
  histroy,
}
