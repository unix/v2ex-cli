const posts = require('../src/pages/posts')
const commander = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const { storage } = require('../src/utils')
const checkLog = new ora('check params..')
const fetchLog = new ora('fetching..')
// parse id
commander.parse(process.argv)

const show = p => {
  fetchLog.clear()
  fetchLog.info(`post: ${p.id}`)
  console.log(chalk.black.bgWhite.bold(` -${p.title}- \n`))
  console.log(`${p.content} \n`)
}
const findPost = async(id, cache = null) => {
  checkLog.stop()
  fetchLog.start()
  try {
    if (cache) return show(cache)
    const post = await posts.show(id)
    fetchLog.text = ''
    if (!post || !post.length) return fetchLog.fail('No content')
    show(post[0])
  } catch (e) {
    fetchLog.fail(`err: ${String(e)}`)
  }
}

// check id
(async() => {
  checkLog.start()
  const id = (commander.args || [])[0]
  if (!id) return checkLog.fail('id is required')
  
  const postsStorage = await storage.get('posts')
  if (!postsStorage) return await findPost(id)
  
  let post = postsStorage.find(post => post.id === id)
  if (post && post.id) return await findPost(post.id, post)
  
  post = postsStorage.find(post => String(post.id).endsWith(id))
  if (post && post.id) return await findPost(post.id, post)
  await findPost(id)
})()
