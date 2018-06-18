const Table = require('cli-table3')
const ora = require('ora')
const { storage, histroy } = require('../utils')
const { index } = require('../pages/posts')


module.exports = {
  renderPosts: async(page = 1, node = {}) => {
    const fetchLog = new ora('fetching...').start()
    const table = new Table({
      head: ['id', 'title', 're', 'member'],
      colWidths: [10, 60, 5, 15],
    })
  
    try {
      const posts = await index(page, node.name || null)
      if (!posts || !posts.length) {
        fetchLog.text = ''
        return fetchLog.fail('no content')
      }
      storage.set('posts', posts)
      table.push(...posts)
      fetchLog.clear()
      console.log(String(table))
      
      histroy.add('list', `${page}||${node.title || null}||${node.name || null}`)
      return fetchLog.succeed((node && node.title ? `node: ${node.title}，` : 'latest,') + `page: ${page}`)
    } catch (e) {
      fetchLog.clear()
      return fetchLog.fail('Err: ' + String(e))
    }
  },
  
  
  
}
