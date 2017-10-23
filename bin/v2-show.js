const Table = require('cli-table2')
const commander = require('commander')
const ora = require('ora')
const { storage } = require('../src/utils')
const { index } = require('../src/pages/posts')
const fetchLog = new ora('fetching..')

// parse page
commander.parse(process.argv)

const findPostIndex = async(page, node = {}) => {
  fetchLog.start()
  const table = new Table({
    head: ['id', 'title', 're', 'member'],
    colWidths: [10, 60, 5, 15]
  })
  
  try {
    const posts = await index(page, node.id || null)
    if (!posts || !posts.length) {
      fetchLog.text = ''
      return fetchLog.fail('no content')
    }
    storage.set('posts', posts)
    table.push(...posts)
    fetchLog.clear()
    console.log(String(table))
    return fetchLog.succeed(node && node.id ? `node: ${node.title}` : `latest, page: ${page}`)
  } catch (e) {
    fetchLog.clear()
    return fetchLog.fail('Err: ' + String(e))
  }
}

// check id
(async() => {
  const page = commander.args[0]
  await findPostIndex(page || 1)
})()

