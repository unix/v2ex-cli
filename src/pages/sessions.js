const cheerio = require('cheerio')

const { request, apis, makeHeader } = require('../utils')

module.exports = {
  create: async(user, cookie) => {
    try {
      const res = await request({
        uri: apis.signin,
        method: 'POST',
        resolveWithFullResponse: true,
        headers: await makeHeader({
          cookie,
          'Referer': apis.signin,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        formData: Object.assign(user, { next: '/' }),
      })
      if (res.body.includes('次数太多')) {
        throw '尝试次数太多，请在一天后尝试'
      }
      return { cookie: '' }
    } catch (e) {
      if (String(e).includes('次数太多')) {
        throw '尝试次数太多，请在一天后尝试'
      }
      if (String(e).includes('StatusCodeError: 302')) {
        let cookieStr = ''
        console.log(123, e.response.headers, e.response.headers['set-cookie'])
        if (e.response && e.response.headers['set-cookie']) {
          const cookies = e.response.headers['set-cookie']
          cookieStr = [...cookies].reduce((pre, next) => pre + next, '')
        }
        return { cookie: cookieStr }
      }
      return e
    }
  },
  
  generateOnce: async() => {
    const res = await request({
      uri: apis.signin,
      method: 'GET',
      headers: await makeHeader(),
      resolveWithFullResponse: true,
    })
    if (res.body.includes('次数太多')) {
      throw '尝试次数太多，请在一天后尝试'
    }
    const cookies = res.headers['set-cookie']
    const cookieStr = [...cookies].reduce((pre, next) => pre + next, '')
    const $ = cheerio.load(res.body)
    const inputs = $('form input.sl')
    const result = []
    const once = String($('.google-signin')[0].attribs.onclick || '').match(/\d+/g)[0]
    result.push({ name: 'once', key: 'once', value: once })
    inputs.each((index, input) => {
      if (input.attribs.type === 'password') {
        return result.push({ name: 'password', key: input.attribs.name })
      }
      if (String(input.attribs.placeholder).includes('用户名')) {
        return result.push({ name: 'username', key: input.attribs.name })
      }
      if (String(input.attribs.placeholder).includes('验证码')) {
        const img = `${apis.host}/_captcha?once=${once}`
        result.push({ name: 'verify', key: input.attribs.name, img })
      }
    })
    return { cookie: cookieStr, result: result }
  },
  
  download: async(img, cookie) => {
    return await request({
      uri: img,
      method: 'GET',
      encoding: 'binary',
      headers: await makeHeader({
        cookie,
        'Content-Type': 'image/png',
        'Accept': 'text/html,application/xhtml+xml,image/webp,image/apng',
      }),
    })
  },
  
  check: async(cookie) => {
    const res = await request({
      uri: apis.host,
      method: 'GET',
      resolveWithFullResponse: true,
      headers: await makeHeader({
        cookie,
      }),
    })
    const cookies = res.headers['set-cookie']
    const cookieStr = [...cookies].reduce((pre, next) => pre + next, '')
    return { cookie: cookieStr, body: res.body }
  },
}
