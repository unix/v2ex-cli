const Table = require('cli-table2')
const commander = require('commander')
const { storage } = require('../src/utils')
const { index } = require('../src/pages/posts')

const table = new Table({
  head: ['id', 'title', 'desc', 're', 'member'],
  colWidths: [10, 40, 50, 5, 10]
})

// parse page
commander.parse(process.argv)

const findPostIndex = async(page) => {
  try {
    const posts = await index(page)
    if (!posts || !posts.length) return console.log('No content')
    storage.set('posts', posts).then()
    const rows = posts.map(row => ([
      String(row.id),
      String(row.title),
      String((row.content_rendered || '').match(/[\u4e00-\u9fa5]+/g)),
      String(row.replies),
      String((row.member || {}).username),
    ]))
    table.push(...rows)
    console.log(String(table))
  } catch (e) {
    console.log('err:' + String(e))
  }
}

// check id
(async() => {
  const page = commander.args[0]
  await findPostIndex(page || 1)
})()
