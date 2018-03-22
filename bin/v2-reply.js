const commander = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')
const posts = require('../src/pages/posts')
const { histroy } = require('../src/utils')
const replyLog = new ora('find posts recently browsed...')
const submitLog = new ora('submit...')

// parse page
commander.parse(process.argv)


const promps = [{
  type: 'input',
  name: 'reply',
  message: 'reply:',
  validate: input => !!input,
}]

;(async() => {
  replyLog.start()
  const post = await histroy.get('post')
  if (!post) return replyLog.fail('there is no record')
  const [id, once, title] = post.split('||')
  replyLog.clear()
  replyLog.info(`to: post.${id}  [${title}] \n`)
  const { reply } = await inquirer.prompt(promps)
  if (!reply || reply.length < 5) return console.log(chalk.red('Error: content length'))
  
  const nextReply = async() => {
    try {
      const post = await posts.show(id)
      if (!post || !post.id) return
      histroy.add('post', `${post.id}||${post.once}||${post.title}`)
    } catch (e) {
      console.log(e)
    }
  }
  try {
    submitLog.start()
    const res = await posts.reply(id, once, reply)
    nextReply().then()
    submitLog.clear()
    if (res === 'ok') return submitLog.succeed('successful reply')
    submitLog.fail(String(res))
  } catch (e) {
    submitLog.clear()
    submitLog.fail(String(e))
    nextReply().then()
  }
})()
