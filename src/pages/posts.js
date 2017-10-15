const { request, apis, makeHeader } = require('../utils')

module.exports = {
  index: async() => {
    try {
      const posts = await request({
        uri: apis.all,
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
