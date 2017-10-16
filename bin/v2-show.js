const Table = require('cli-table2')
const commander = require('commander')
const ora = require('ora')
const { storage } = require('../src/utils')
const { index } = require('../src/pages/posts')

// parse page
commander.parse(process.argv)

const findPostIndex = async(page, node = {}) => {
  const log = new ora('fetching..').start()
  const table = new Table({
    head: ['id', 'title', 'desc', 're', 'member'],
    colWidths: [10, 40, 50, 5, 10]
  })
  
  try {
    const posts = await index(page, node.id || null)
    if (!posts || !posts.length) return log.fail('no content')
    storage.set('posts', posts)
    
    const rows = posts.map(row => ([
      String(row.id),
      String(row.title || ''),
      String((row.content_rendered || '').match(/[\u4e00-\u9fa5]+/g)),
      String(row.replies),
      String((row.member || {}).username),
    ]))
    table.push(...rows)
    
    console.log(String(table))
    return log.succeed(node && node.id ? `node: ${node.title}` : `latest, page: ${page}`)
  } catch (e) {
    return log.fail('err:' + String(e))
  }
}

// check id
(async() => {
  const page = commander.args[0]
  await findPostIndex(page || 1)
})()

