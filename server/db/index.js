//导入mysql模块
const mysql = require('mysql')
    //创建数据库链接对象
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ljr12345',
    database: 'newtree'
})

module.exports = db;