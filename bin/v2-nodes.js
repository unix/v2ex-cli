const nodesRes = require('../src/pages/nodes')
const commander = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const { storage } = require('../src/utils')
const renderer = require('../src/services/renderer')
const log = new ora('check params..').start()

// parse search name
commander.parse(process.argv)

const showIndex = len => {
  log.succeed(`nodes updated, count: ${len}.\ntry run [${chalk.green('v2 nodes {note_name}')}]`)
}
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
  log.stop()
  await renderer.renderPosts(page, node)
})()

