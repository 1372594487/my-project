let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
//保存index.js的绝对路径
global.__basename = __dirname;
//导入config.js
global.config = require(path.resolve(__basename + '/config/config.js'))
//导入connect.js 连接mysql
global.sequelize = require(__basename + '/db/connect.js')
//导入模型集合models.js
global.model = require(__basename + '/db/model/models.js')
//导入路由
let routes = require(path.resolve(__basename + '/routes/routes.js'))
// console.log("config ==>",config);

//创建实例
let app = express();
// 设置cors请求跨域
app.all('*', function (req, res, next) {
    //表示允许所有域请求，在实际开发中，一般指定允许某个域请求
    // res.header("Access-Control-Allow-Origin", "http://www.sryblog.top:10000");
    //动态允许域名请求，(相比'*')这样可以允许跨域携带cookie
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // 如果浏览器请求包括Access-Control-Allow-Origin字段，则Access-Control-Allow-Headers字段是必须的。它也是一个逗号分隔的字符串，
    // 表明服务器支持的所有头信息字段
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    // 该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。返回的是所有支持的方法而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // 可选字段。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在cors请求中。设为true，表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值只能设为true，如果服务器不需要浏览器发送Cookie，删除该字段即可。
    res.header('Access-Control-Allow-Credentials', 'true');
    //
    next();
});
//处理请求体
// 将post请求参数解析为json
// limit限制解析请求体大小
app.use(bodyParser.json({
    limit: 2 * 1024 + 'kb'
}));
app.use(bodyParser.urlencoded({
    //extended:false，接收任何数据格式，
    extended: false,
    limit: 2 * 1024 + 'kb'
}))

//设置静态目录 '/static/file' 伪路径
app.use('/static/file', express.static(path.resolve(__basename + '/upload')))


//加载路由
routes(app);

//监听端口
app.listen(10001, () => {
    console.log(`this server running in ${config.serverOptions.host}:/${config.serverOptions.port}`);
})

