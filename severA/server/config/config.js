//一个文件只有module.exports导出，可以有多个exports导出
//exports导出相当于给module.exports添加属性，
exports.serverOptions = {
    host: 'http://127.0.0.1',
    port: 10001,
    baseUrl:'/static/file/'

}

exports.nickNameOptions = [
    'a',
    'b',
    'c',
    'd',
    'e',
];

//加强加密
exports.saltOptions = {
    'pwd': '_pwd_'
}
//数据库配置
exports.mysqlOptions = {
    //数据库名称
    database: 'server_db',
    //用户名
    username: 'root',
    //密码
    password: 'root',
    //数据库类型
    dialect: 'mysql',
    //时区
    timezone: '+08:00',
    //字段命名 以 _ 分隔
    define: {
        underscored: true
    }
}
//邮件配置
exports.emailOptions = {
    //服务器地址
    host: 'smtp.qq.com',
    //端口，25端口在aliyun服务器被禁止，建议使用465
    port: 465,
    //如果端口为465，此项需要设置成true，其他端口需要修改为false
    secure: true,
    //授权认证
    user: '1372594487@qq.com',
    //授权码：
    pass: 'ibqmagtqvumoficf',

    //有效时间，毫秒
    expires:5 * 60 * 1000,
}
//允许请求（白名单）
exports.hostOptions = [
        'http://127.0.0.1:8080',
        'http://localhost:8080'
]
//验证验证码请求路径
exports.codeUrlOptions = [
    '/register',
]

//token配置
exports.tokenOptions= {
    //token加盐
    salt: '_tk_',
    //有效时间
    expires:'1d',
    //需要验证token的请求路径
    tokenUrls:[
        '/getUserInfo',
        '/type',
        '/postProduct',
        '/search',
        '/count',
        '/switchState',
        '/removeProduct',
    ]
}