const express = require('express')
const cors = require('cors');
const db = require('./db/index.js');



const app = express()


app.use(express.urlencoded({ extended: false }))

app.use(cors());

//解析urlencode中间件
app.use(express.urlencoded({ extended: false }))

const session = require('express-session')
app.use(session({
    secret: 'hahaha',
    resave: false,
    saveUninitialized: true,
}))

app.get('/getTreeList', (req, res) => {
    db.query('select * from newtree.newtree', (err, treeNode) => {
        if (err) res.cc(err);
        res.json(treeNode);
    })
})

app.get('/changeContent', (req, res) => {
    db.query(`select * from newtree.newtree where id = ${req.query.id}`, (err, content) => {
        if (err) res.cc(err);
        console.log(content);
        res.json(content);
    })
})

app.get('/SaveNewContent', (req, res) => {
    db.query(`update newtree.newtree set content = '${req.query.data.text}', month = '${req.query.data.month}',day = '${req.query.data.day}',hour = '${req.query.data.hour}',minutes = '${req.query.data.minutes}',time =  '${req.query.data.date}' where id = ${req.query.data.id}`, (err, content) => {
        if (err) res.cc(err);
        console.log(content);
        res.json("保存成功！")
    })
})

app.get('/insertTree', (req, res) => {
    db.query(`insert into newtree.newtree (name,pid,isFile,content,month,day,hour,minutes,time,isCollect) values ('${req.query.newNode.name}','${req.query.newNode.pid}','${req.query.newNode.isFile}','${req.query.newNode.content}','${req.query.newNode.month}','${req.query.newNode.day}','${req.query.newNode.hour}','${req.query.newNode.minutes}','${req.query.newNode.time}','${req.query.newNode.isCollect}')`, (err, content) => {
        if (err) res.cc(err);
        res.json(content);
    })

})

app.get('/DeleteTree', (req, res) => {
    db.query(`delete from newtree.newtree where id=${req.query.id} or pid=${req.query.id}`, (err, content) => {
        if (err) res.cc(err);
        res.json("删除成功!");
    })

})

app.get('/newName', (req, res) => {
    db.query(`update newtree.newtree set name='${req.query.name}' where id=${req.query.id}`, (err, content) => {
        if (err) res.cc(err);
        console.log(content);
        res.json("修改成功！")
    })
})

app.get('/changeIsCollect', (req, res) => {
    db.query(`update newtree.newtree set isCollect = '${req.query.data.isCollect}' where id=${req.query.data.id}`, (err, content) => {
        if (err) res.cc(err);
        console.log(content);
        res.json("保存成功！")
    })
})

app.get('/searchIsCollect', (req, res) => {
    db.query(`select * from newtree.newtree where id = ${req.query.id}`, (err, content) => {
        if (err) res.cc(err);
        console.log(content);
        res.json(content);
    })
})


//一定要在路由之前，封装res.cc函数
app.use((req, res, next) => {
    //status默认值为1，表示失效的情况
    //err的值，可能是错误对象，也可能是一个错误的描述字符串
    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

//一定要在路由之前配置解析token的中间件
const userRouter = require('./router/user')
const expressJWT = require('express-jwt')
const config = require('./schema/config')

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

//导入并注册用户路由模块
const { ValidationError } = require('@hapi/joi/lib/errors')
const Joi = require('@hapi/joi')

app.use('/api', userRouter)

//定义错误级别的中间件
app.use((err, req, res, next) => {
    //验证失败导致错误
    if (err instanceof Joi.ValidationError) return res.cc(err)
        //身份认证失败后的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！!')
        //未知错误
    res.cc(err)
})




app.listen('8080', () => {
    console.log('api server running at http://127.0.0.1:8080');
})