const { request, apis, makeHeader } = require('../utils')

module.exports = {
  index: async(page, nodeID) => {
    try {
      const posts = await request({
        uri: nodeID ? `${apis.show}?node_id=${nodeID}` : apis.all,
        method: 'GET',
        headers: await makeHeader(),
      })
      return JSON.parse(posts)
    } catch (e) {
      return e
    }
  },
  show: async(id) => {
    try {
      const post = await request({
        uri: `${apis.topic}?id=${id}`,
        method: 'GET',
        headers: await makeHeader(),
      })
      return JSON.parse(post)
    } catch (e) {
      return e
    }
  },
}
