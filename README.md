## V2EX CLI   [![Build Status](https://travis-ci.org/WittBulter/v2ex-cli.svg?branch=master)](https://travis-ci.org/WittBulter/v2ex-cli)   [![npm version](https://badge.fury.io/js/v2ex-cli.svg)](http://badge.fury.io/js/v2ex-cli)   [![npm](https://img.shields.io/npm/dt/v2ex-cli.svg?style=plastic)](http://npm-stat.com/charts.html?package=v2ex-cli)


![install](https://github.com/WittBulter/v2ex-cli/blob/master/assets/install.png)
### 安装
> 需要 NodeJS 6.0+ 环境 (更低版本未测试) [NodeJS 安装](https://nodejs.org/en/download/current/)

```bash
npm i -g v2ex-cli
```

### 使用
- 增加自己的 cookie: `v2 install`
  (获取 cookie 请在登录后打开浏览器控制台，在 network 中找地址包含 `v2ex.com` 的链接，拷贝头信息中所有的 cookie 值)

- 列表阅读: `v2 show`

- 翻页: `v2 go {number}`
  默认 `v2 go` 前往下一页
  默认 `v2 go -p` 返回上一页

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



<p><details>
  <summary><b>预览</b> 点击打开</summary>
  <ul>
    <li>
      <h3>安装</h3>
      <img src="https://github.com/WittBulter/v2ex-cli/blob/master/assets/install.png">
    </li>
    <li>
      <h3>列表</h3>
      <img src="https://github.com/WittBulter/v2ex-cli/blob/master/assets/read.png">
    </li>
    <li>
      <h3>阅读</h3>
      <img src="https://github.com/WittBulter/v2ex-cli/blob/master/assets/read2.png">
    </li>
    <li>
      <h3>节点</h3>
      <img src="https://github.com/WittBulter/v2ex-cli/blob/master/assets/node.png">
    </li>
    <li>
      <h3>回复</h3>
      <img src="https://github.com/WittBulter/v2ex-cli/blob/master/assets/reply.png">
    </li>
  </ul>
</details></p>











