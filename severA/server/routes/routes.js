//导入路由控制
let routesController = require(__basename+'/routes_controller/routes_controller.js')
//一个文件只有module.exports导出，可以有多个exports导出
//exports导出相当于给module.exports添加属性，
module.exports = app => {
    //请求域拦截（白名单）
    app.use(routesController.verifyHost);
    //验证码拦截（白名单）
    app.use(routesController.verifyCode);
    //验证登录
    app.use(routesController.verifyToken);
    //
    app.get('/',routesController.test);
    //注册接口
    app.post('/register',routesController.register);
    //发邮件
    app.post('/email',routesController.email);
    // 登录接口
    app.post('/login',routesController.login);
    //获取用户信息
    app.get('/getUserInfo',routesController.getUserInfo);
    //获取商品信息
    app.get('/type',routesController.getTypeData)
    //发布商品
    app.post('/postProduct',routesController.postProduct)
    //搜索商品
    app.get('/search',routesController.search)
    //查询商品数目
    app.get('/count',routesController.count)
    //商品上下架
    app.post('/switchState',routesController.switchState)
    //修改商品
    app.post('/UpdateProduct',routesController.UpdateProduct)
    //删除商品
    app.post('/removeProduct',routesController.removeProduct)
}