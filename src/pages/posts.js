const cheerio = require('cheerio')
const { request, apis, makeHeader, storage, checkAuthorization } = require('../utils')

module.exports = {
  index: async(page, node = null) => {
    const uri = node ? `${apis.go}/${node}?p=${page}` : `${apis.recent}?p=${page}`
    try {
      const posts = await request({
        uri, method: 'GET',
        headers: await makeHeader({
          cookie: String(await storage.getCookie()),
        }),
      })
      if (!checkAuthorization(posts)) {
        throw 'cookie not found, try run [v2 install] set it.'
      }
      const $ = cheerio.load(String(posts))
      const result = []
      $('span.item_title').each(function() {
        const postLink = cheerio(cheerio(this).find('a')[0])
        const userLink = cheerio(this).parents('tr').find('img.avatar').parent()
        const links = cheerio(this).parents('tr').find('a.count_livid')
        const replies = (links && links[0]) ? cheerio(links[0]).attr('href').split('reply')[1] : 0
        // [id, title, re, member]
        result.push([
          postLink.attr('href').split('#')[0].match(/\d+/g)[0],
          postLink.text(),
          replies,
          userLink.attr('href').split('member/')[1],
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
        uri: `${apis.post}/${id}`,
        method: 'GET',
        headers: await makeHeader({ cookie: String(await storage.getCookie()) }),
      })
      if (!checkAuthorization(post)) {
        throw 'cookie not found, try run [v2 install] set it.'
      }
      const $ = cheerio.load(String(post))
      const re = {
        title: cheerio($('h1')[0]).text(),
        content: $('.markdown_body').text(),
        comments: [],
        id: id,
        once: cheerio($('input[name=once]')[0]).attr('value'),
      }
      $('.reply_content').each(function() {
        re.comments.push({
          content: cheerio(this).text(),
          member: cheerio(this).parent().find('.dark').text(),
        })
      })
      return re
    } catch (e) {
      throw e
    }
  },
  
  reply: async(id, once, content) => {
    try {
      const res = await request({
        uri: `${apis.post}/${id}`,
        method: 'POST',
        resolveWithFullResponse: true,
        headers: await makeHeader({
          cookie: String(await storage.getCookie()),
          'Referer': apis.host,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        formData: { content, once },
      })
      console.log(res)
    } catch (e) {
      if (String(e).includes('StatusCodeError: 302')) return 'ok'
      return e
    }
  },
}
