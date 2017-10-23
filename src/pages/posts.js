const cheerio = require('cheerio')
const { request, apis, makeHeader, storage } = require('../utils')

module.exports = {
  index: async(page, nodeID) => {
    const uri = nodeID ? `${apis.go}/${nodeID}?p=${page}` : `${apis.recent}?p=${page}`
    try {
      const posts = await request({
        uri, method: 'GET',
        headers: await makeHeader({
          cookie: String(await storage.getCookie()),
        }),
      })
      if (String(posts).includes('<a href="/signin" class="top">登录</a>')) {
        throw 'cookie not found, try run [v2 install] set it.'
        return ''
      }
      const $ = cheerio.load(String(posts), { decodeEntities: true })
      let result = []
      $('span.item_title').each(function(index) {
        const postLink = cheerio(cheerio(this).find('a')[0])
        const userLink = cheerio(this).parents('tr').find('img.avatar').parent()
        const links = cheerio(this).parents('tr').find('a.count_livid')
        const replies = (links && links[0]) ? cheerio(links[0]).attr('href').split('reply')[1] : 0
        result.push([
          postLink.attr('href').split('#')[0].match(/\d+/g)[0],   // id
          postLink.text(),    // title
          replies,            // re
          userLink.attr('href').split('member/')[1],    // member
        ])
      })
      return result
    } catch (e) {
      throw e
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
