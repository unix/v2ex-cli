const { request, apis, makeHeader } = require('../utils')

module.exports = {
  index: async() => {
    try {
      const indexs = await request({
        uri: apis.all,
        method: 'GET',
        headers: await makeHeader(),
      })
      return JSON.parse(indexs)
    } catch (e) {
      return e
    }
  },
  show: async() => {
  
  },
}
