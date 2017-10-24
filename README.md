## V2EX CLI [![npm version](https://badge.fury.io/js/v2ex-cli.svg)](http://badge.fury.io/js/v2ex-cli)
![install](https://github.com/WittBulter/v2ex-cli/blob/master/assets/install.png)


### 安装
> 需要 NodeJS 8.0+ 环境 (不支持更低版本) [NodeJS 安装](https://nodejs.org/en/download/current/)

```bash
npm i -g v2ex-cli
```

### 使用
- 增加自己的 cookie: `v2 install`
  (获取 cookie 请在登录后打开浏览器控制台，在 network 中任意一个链接的头信息中找到)

- 列表阅读: `v2 show`

- 翻页: `v2 go 2`

- 阅读指定帖子: `v2 read {postID}`
  如果曾阅读过列表，只输入 id 的后几位即可

- 回复帖子: `v2 reply`
  回复上一次阅读的帖子

- 节点，获取所有节点: `v2 nodes`

- 节点，选取一个节点阅读: `v2 nodes {node_name}`
  如: `v2 nodes programmer`

- 节点，翻页：同翻页

- 查看缓存或清除: `v2 cache`, `v2 cache -d`

- 卸载：`v2 implide`

- 帮助: `v2`, `v2 {command} -h`


### 相关

工具暂时没有开放登录，只能通过 `v2 install` 手动添加 cookie 访问。因为目前 v2ex 添加了验证码，
显示图片不能在所有终端做到非常好的兼容。同时错误的登录会导致 IP 被封锁一天。(v2ex 近期的策略太暴力了)


### 预览
- 安装
  ![install](https://github.com/WittBulter/v2ex-cli/blob/master/assets/install.png)

- 列表
  ![read](https://github.com/WittBulter/v2ex-cli/blob/master/assets/read.png)

- 阅读
  ![read2](https://github.com/WittBulter/v2ex-cli/blob/master/assets/read2.png)

- 节点
  ![node](https://github.com/WittBulter/v2ex-cli/blob/master/assets/node.png)

- 回复
  ![node](https://github.com/WittBulter/v2ex-cli/blob/master/assets/reply.png)













