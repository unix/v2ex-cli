const posts = require('../src/pages/posts')
const commander = require('commander')
const chalk = require('chalk')
const { storage } = require('../src/utils')

// parse id
commander.parse(process.argv)

const show = p => {
  console.log(`post: ${p.id}`)
  console.log(chalk.black.bgWhite.bold(` -${p.title}- \n`))
  console.log(`${p.content} \n`)
}
const findPost = async(id, cache = null) => {
  try {
    if (cache) return show(cache)
    const post = await posts.show(id)
    if (!post || !post.length) return console.log('No content')
    show(post[0])
  } catch (e) {
    console.log('err:' + String(e))
  }
}

// check id
(async() => {
  const id = commander.args[0]
  if (!id) {
    console.log('id is required, like:', chalk.blue('v2 read 10'));
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
