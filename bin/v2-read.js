const list = require('../src/pages/list')
const Table = require('cli-table2')

list().then(indexs => {
})
.catch(e => {
  console.log('err:' + String(e))
})

