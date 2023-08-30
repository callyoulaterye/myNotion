const joi = require('joi')
    /*
        string()值必须为字符串
        alphanum()值只能包含a-z A-Z 0-9字符串
        min(length)最小长度
        max(length)最大长度
        required()值为必填项，不能为undefined
        pattern(正则表达式)值必须符合正则表达式的规则
     */

//用户的验证规则
const username = joi.string().alphanum().min(3).max(12).required()
    //密码的验证规则
const password = joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).required()

//定义注册和登录表单的验证规则对象
exports.reg_login_schema = {
    body: {
        username,
        password,
    }
}