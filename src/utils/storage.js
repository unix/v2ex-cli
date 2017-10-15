const { exists, spawnSync, writeFile, readFile }  = require('./base')
exists('./temp').then(bool => !bool && spawnSync('mkdir', ['./temp/']))

module.exports = {
  storage: {
    set: async (key, value) => {
      const path = `./temp/${key}.txt`
      if (await exists(path)) spawnSync('rm', [path])
      await writeFile(path, JSON.stringify(value), 'utf-8')
    },
  
    get: async (key) => {
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
  },
}
