const cheerio = require('cheerio')
const { request, apis, makeHeader } = require('../utils')

module.exports = {
  create: async() => {
    const keys = await generateOnceToken()
    
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
      return
    }
    const cookies = res.headers['set-cookie']
    const cookieStr = [...cookies].reduce((pre, next) => pre + next, '')
    const $ = cheerio.load(res.body)
    const inputs = $('form input.sl')
    let result = []
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
        return result.push({ name: 'verify', key: input.attribs.name, img })
      }
    })
    return { cookie: cookieStr, result: result }
  },
  
  download: async(img, cookie) => {
    return await request({
      uri: img,
      method: 'GET',
      headers: await makeHeader({ cookie }),
    })
  }
}
