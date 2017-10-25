const { request, apis, makeHeader } = require('../utils')

module.exports = {
  index: async() => {
    try {
      const posts = await request({
        uri: apis.nodes,
        method: 'GET',
        headers: await makeHeader(),
      })
      return JSON.parse(posts)
    } catch (e) {
      return e
    }
  },
  search: async() => {
  },
}
