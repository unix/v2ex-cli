const commander = require('commander')
const { histroy } = require('../src/utils')
const ora = require('ora')
const renderer = require('../src/services/renderer')
const pageLog = new ora('check page..')

// parse search name
commander
  .option('-n, --next', 'next page')
  .option('-p, --pre', 'pre page')
  .parse(process.argv)

;(async() => {
  pageLog.start()
  const list = await histroy.get('list')
  const pageNumber = +commander.args[0]
  const pre = commander.pre || false
  
  if (!list) return pageLog.fail('there is no record')
  const [page, title, name] = list.split('||')
  const node = {
    title: (!title || title === 'null') ? null : title,
    name: (!name || name === 'null') ? null : name,
  }
  
  // next page (default action)
  let next = Number.isNaN(+page) ? 1 : (+page + 1)
  // pre page
  if (pre && next > 2) {
    next = next - 2
  }
  // specified page
  if (!Number.isNaN(pageNumber) && pageNumber > 0) {
    next = pageNumber
  }
  pageLog.text = ''
  pageLog.stop()
  await renderer.renderPosts(next, node)
})()
