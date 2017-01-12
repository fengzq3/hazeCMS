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