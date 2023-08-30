[toc]

### 背景

> 此为自用的学习笔记软件，支持markdown语法

### 环境依赖

node v16.16.0

npm v8.11.0

axios v1.4.0

bcryptjs v2.4.3

core-js v3.8.3

cors v2.8.5

dayjs v1.11.7

element-plus v2.3.3

express v4.17.1

express-jwt v5.3.3

express-session v1.17.3

joi v17.6.4

jsonwebtoken v8.5.1

mysql v2.18.1

normalize.css v8.0.1",

pinia v2.1.3

vue v3.2.13

vue-router v4.2.4

vuex v4.1.0

### 部署步骤

1. 安装node环境
2. 安装npm

> npm install

3. 安装mysql

> npm install mysql

4. 安装环境依赖中所需要的包
5. 启动后台，在终端中打开后台app.js

> node ./app.js

6. 在终端打开app.vue

> npm run serve

即可打开项目

### 目录结构描述

```
├── Readme.md                   // help
├── node_modules  
├── public
│   └── index.html  
├── server                      // 后台
│   ├── db
│       ├── index.js
│   ├── router  
│       ├── router_handler
│           ├── user.js
│       ├── user.js
│   ├── schema
│       ├── config.js
│       ├── user.js
│   ├── app.js
├── src                      
│   ├── api
│       ├── index.js
│   ├── assets
│       ├── avatar.png
│       ├── background.jpg
│       ├── classify.png
│       ├── collect.png
│       ├── collected.png
│       ├── file.png
│       ├── file1.png
│       ├── folder.png
│       ├── icon_time.png
│       ├── logo.png
│       ├── note.png
│       ├── Plus.png
│   ├── components
│       ├── Aside.vue
│       ├── collection.vue
│       ├── login.vue
│       ├── main.vue
│       ├── MyTree.vue
│       ├── note.vue
│       ├── register.vue
│       ├── right.vue
│       ├── start.vue
│   ├── page
│       ├── Home.vue
│       ├── userpage.vue
│   ├── router
│       ├── index.js
│   ├── store
│       ├── index.js
│   ├── app.vue
│   ├── main.js

├── .gitnore                        
├── babel.config.js
├── jsconfig.json
├── package-lock.json
├── package.json         
└── vue.config.js
```

### 版本内容更新

版本：0.1.0



