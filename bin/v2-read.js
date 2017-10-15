const posts = require('../src/pages/posts')
const Table = require('cli-table2')
const commander = require('commander')
const chalk = require('chalk')
const { parse, storage } = require('../src/utils')

// parse id
parse()

const findPost = async(id) => {
  try {
    const post = await posts.show(id)
    if (!post || !post.length) return console.log('No content')
    const p = post[0]
    console.log(`post: ${id}`)
    console.log(chalk.black.bgWhite.bold(` -${p.title}- `))
    console.log('-------\n')
    console.log(`${p.content} \n`)
  } catch (e) {
    console.log('err:' + String(e))
  }
}

// check id
(async() => {
  const id = commander.args[0]
  const postsStorage = await storage.get('posts')
  if (!postsStorage) return await findPost(id)
  
  let post = postsStorage.find(post => post.id === id)
  if (post && post.id) return await findPost(post.id)
  
  post = postsStorage.find(post => String(post.id).endsWith(id))
  if (post && post.id) return await findPost(post.id)
  await findPost(id)
})()
