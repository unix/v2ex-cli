global.V2EX_TEMP = {}

const storage = {
  set: (key, value) => {
    global.V2EX_TEMP[key] = value
  },
  
  get: key => {
    return global.V2EX_TEMP[key] || null
  },
  
  has: key => {
    return !!global.V2EX_TEMP[key]
  }
}

module.exports = {
  storage,
}
