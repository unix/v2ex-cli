const posts = require('../src/pages/posts')
const commander = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const { storage } = require('../src/utils')
const log = new ora('check params..').start()
// parse id
commander.parse(process.argv)

const show = p => {
  log.clear()
  log.info(`post: ${p.id}`)
  console.log(chalk.black.bgWhite.bold(` -${p.title}- \n`))
  console.log(`${p.content} \n`)
}
const findPost = async(id, cache = null) => {
  log.clear()
  log.text = 'fetching..'
  try {
    if (cache) return show(cache)
    const post = await posts.show(id)
    log.text = ''
    if (!post || !post.length) return log.fail('No content')
    show(post[0])
  } catch (e) {
    log.fail(`err: ${String(e)}`)
  }
}

// check id
(async() => {
  const id = commander.args[0]
  if (!id) {
    log.fail('id is required')
    return process.exit(1)
  }
  const postsStorage = await storage.get('posts')
  if (!postsStorage) return await findPost(id)
  
  let post = postsStorage.find(post => post.id === id)
  if (post && post.id) return await findPost(post.id, post)
  
  post = postsStorage.find(post => String(post.id).endsWith(id))
  if (post && post.id) return await findPost(post.id, post)
  await findPost(id)
})()
