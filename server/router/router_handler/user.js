//导入数据库操作模块
const db = require('../../db/index')
    //导入bcrypt.js包
const bcrypt = require('bcryptjs')
    //导入生成Token的包
const jwt = require('jsonwebtoken')
    //导入全局配置
const config = require('../../schema/config')


//注册用户的处理函数
exports.regUser = (req, res) => {
    //获取客户端提交到服务器的用户信息
    const userinfo = req.body

    //定义sql语句，查询用户是否被占用
    const sqlstr = 'select * from newtree.user where username=?'
    db.query(sqlstr, userinfo.username, (err, results) => {
        //执行sql语句失败
        if (err) {
            return res.cc(err)
        }
        //判断用户名是否被占用
        if (results.length > 0) {
            return res.cc('用户名被占用,请更换用户名')
        }
        //调用bcrypt.hashSync()对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
            //定义插入新用户的sql语句
        const sql = 'insert into newtree.user set ?'
            //调用db.query()执行sql语句
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            //判断sql语句是否执行成功
            // if (err) return res.send({ status: 1, message: err.message })
            if (err) return res.cc(err)
                //判断影响行数是否为1

            if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试')
            res.cc('注册成功', 0)
        })
    })
}

//登录用户的处理函数
exports.login = (req, res) => {
    //接收表单数据
    const userinfo = req.body
        //定义sql语句
    const sql = 'select * from newtree.user where username=?'
        //执行sql语句，根据用户名信息查询用户的信息
    db.query(sql, userinfo.username, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
            //执行sql语句成功，但是获取到的数据条数不等于1
        if (results.length !== 1) return res.cc('登录失败！')
            //判断密码是否正确
            //拿着用户输入的密码，和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        //如果对比的结果等于false，则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('密码输入失败！')
        }
        //登录成功，生成Token字符串
        const user = {...results[0], password: '' }
            //对用户信息进行加密，生成Token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
            //调用res.send()将token相应给客户端
        res.send({
            status: 0,
            message: '登陆成功',
            Token: 'Bearer' + tokenStr,
        })
    })
}