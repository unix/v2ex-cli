const posts = require('../src/pages/posts')
const Table = require('cli-table2')
const table = new Table({
  head: ['id', 'title', 'desc', 're', 'member'],
  colWidths: [10, 40, 50, 5, 10]
})

posts.index().then(indexs => {
  const rows = indexs.map(row => ([
    String(row.id),
    String(row.title),
    String((row.content_rendered || '').match(/[\u4e00-\u9fa5]+/g)),
    String(row.replies),
    String((row.member || {}).username),
  ]))
  table.push(...rows)
})
.catch(e => {
  console.log('err:' + String(e))
})

