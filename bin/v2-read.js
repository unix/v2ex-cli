const posts = require('../src/pages/posts')
const Table = require('cli-table2')
const commander = require('commander')
const { parse, storage } = require('../src/utils')

// parse id
parse()

const findPost = id => {
  posts.show(id)
    .then(post => {
      if (!post || !post.length) return console.log('No content')
      console.log(post[0])
      console.log(post[0].content)
    })
    .catch(e => console.log('err:' + String(e)))
}

// check id
const id = commander.args[0]
const postsStorage = storage.get('posts')
console.log(postsStorage)
if (!postsStorage) return findPost(id)

let post = postsStorage.find(post => post.id === id)
if (post && post.id) return findPost(post.id)

post = postsStorage.find(post => String(post.id).endsWith(id))
if (post && post.id) return findPost(post.id)
findPost(id)

