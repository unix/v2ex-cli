const Table = require('cli-table2')
const nodesRes = require('../src/pages/nodes')
const postsRes = require('../src/pages/posts')
const commander = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const { storage } = require('../src/utils')
const log = new ora('check params..').start()

// parse search name
commander.parse(process.argv)

const showIndex = len => log.succeed(`nodes length: ${len}. preview note: "v2 notes {{note_name}}"`)
const findIndex = async() => {
  log.text = 'fetching..'
  const notes = await storage.get('nodes')
  if (notes) return showIndex(notes.length)
  try {
    const notesFromFetch = await nodesRes.index()
    if (!notesFromFetch || !notesFromFetch.length) return log.fail('No content')
    storage.set('nodes', notesFromFetch)
    showIndex(notesFromFetch.length)
  } catch (e) {
    log.fail(`err: ${String(e)}`)
  }
}
const findPostIndex = async(page, node = {}) => {
  const table = new Table({
    head: ['id', 'title', 're', 'member'],
    colWidths: [10, 60, 5, 15]
  })
  
  try {
    const posts = await postsRes.index(page, node.name || null)
    log.clear()
    if (!posts || !posts.length) return log.fail('no content')
    storage.set('posts', posts)
    table.push(...posts)
    
    console.log(String(table))
    return log.succeed(`node: ${node.name} (${node.title}), page: ${page}`)
  } catch (e) {
    return log.fail('err:' + String(e))
  }
}

// check search name
(async() => {
  const name = commander.args[0]
  if (!name) return await findIndex()
  
  const nodes = await storage.get('nodes')
  const node = nodes.find(node => node.name === name)
  if (!node || !node.id) {
    const likeNodes = nodes.map(node => node.name.includes(name) ? node : {})
      .filter(r => r && r.name)
      .map(node => node.name)
    const showFixRecommend = (likeNodes || []).splice(0, 3).toString()
    const recommendStr = showFixRecommend ? `${showFixRecommend.replace(',', ', ')}` : ''
    log.fail(`not found node: ${chalk.green(name)}.`)
    recommendStr && console.log('you can try:', chalk.green(recommendStr))
    return
  }
  
  const page = (commander.args || [1, 1])[1]
  await findPostIndex(page, node)
})()

