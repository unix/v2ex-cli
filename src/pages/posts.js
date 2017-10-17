const cheerio = require('cheerio')
const { request, apis, makeHeader } = require('../utils')
const parse = async(page) => {
  try {
    const posts = await request({
      uri: `${apis.recent}?p=${page}`,
      method: 'GET',
      headers: await makeHeader(),
    })
    const $ = cheerio.load(String(posts), {
      withDomLvl1: true,
      normalizeWhitespace: false,
      xmlMode: false,
      decodeEntities: true
    })
  } catch (e) {
    return e
  }
}

module.exports = {
  index: async(page, nodeID) => {
    if (page > 1) {
      await parse(page)
      return []
    }
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
