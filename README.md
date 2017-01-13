[TOC]

# hazeCMS
node+express+mongodb 实现纯 javascript 博客

### 文件目录

```
hazeCMS
    |- frontend 前端开发目录
        |- css  样式模块
        |- js   js模块
    |- server   服务端（实际运行目录）
        |- bin  express脚本
        |- control  控制器
        |- model
        |- public   静态文件目录
        |- routes   路由
        |- views    模板文件
```

### 服务器搭

推荐使用 nginx 反向代理
node 采用 pm2 管理进程

## 使用

```
git clone https://github.com/fengzq3/hazeCMS.git
cd hazeCMS/server
npm install
npm run pm2
```

若没有pm2请自行安装`npm install pm2 -g`

## 修改
若需要修改前端样式和js请操作 frontend 文件夹
```
grunt  发布css到server中
webpack 发布js到server中
```
## 关于第三方评论框
目前评论管理使用第三方：多说
请自行修改`views/block/head.jade` 中的 `short_name:"你的多说id"`