//------------------------
//工具库
//------------------------
// 导入crypto，用于加密字符串 crypto node.js的核心模块
let crypto = require('crypto');
//导入nodemailer 用于发送邮件
let nodemailer = require('nodemailer');
//导入jsonwebtoken 用于登录验证
let jsonwebtoken = require('jsonwebtoken');
//导入文件系统模块
let fs = require('fs');
//发邮件配置
//创建发邮件实例
let { host, port, secure, user, pass } = config.emailOptions;
let transporter = nodemailer.createTransport({
    //服务器地址
    host: host,
    //端口，25端口在aliyun服务器被禁止，建议使用465
    port: port,
    //如果端口为465，此项需要设置成true，其他端口需要修改为false
    secure: secure,
    //授权认证
    auth: {
        user: user,
        //授权码：
        pass: pass,
    }
})
class Utils {
    //加密字符串
    encodeString(value) {

        //将value切片
        value = value.slice(0, 3) + config.saltOptions.pwd + value.slice(3);
        console.log('value ==> ', value);
        //待加密的字符串
        let md5 = crypto.createHash('md5');
        return md5.update(value).digest('hex');
        //以16进制输出，输出位数32位

    }
    //将cookie字符串转成对象
    transformCookie(cookie){
        //按照 '; '切割
        let cookieObj = {};
        let cookies  = cookie.split('; ');
        cookies.map(v=>{
            let c = v.split('=');   
            cookieObj[c[0]] = c[1];  
        })
        return cookieObj;
    }

    //随机验证码
    randomCode() {
        let codes = [];
        for (let i = 0; i < 6; i++) {
            let code = Math.floor(Math.random() * 10);
            codes.push(code);
        }
        return codes.join('');
    }
    //发送邮件
    sendEmail(options) {
        //options发邮件配置,boject
        //options.from:发件地址，string
        //options.to:收件地址，string 如果多个收件地址需要写成 'aaa@126.com,bbb@qq.com,ccc@yaho.com
        //options.subject:邮件主题，string
        //text和html二选一
        //options.text:发件内容(文本内容)
        //options.html:发件内容(可含有HTML标签)
        return new Promise((resolve, reject) => {
            transporter.sendMail({
                from: '1372594487@qq.com',
                to: options.to,
                subject: options.subject,
                text: options.text
            }, (err, info) => {
                //如果发邮件失败
                if (err) {
                    reject(err);
                } else {
                    resolve(info)
                }
            })
        })

    }
    //token签名
    signToken(value){
        //value:被签名的字符串
        //config.tokenOptions.salt:token加盐
        return jsonwebtoken.sign({
            data:value
        },config.tokenOptions.salt,{
            //有效时间
            expiresIn:config.tokenOptions.expires
        })
    }
    //解析token
    verifyToken(token){
        return new Promise((resolve,reject)=>{
            jsonwebtoken.verify(token,config.tokenOptions.salt,(err,info)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(info);
                }
            })
        })
    }

    //上传图片
    //base64:图片的base64
    //type:图片类型
    uploadImg(base64,type){
        return new Promise((resolve,reject)=>{
            //
        base64 = base64.replace(/ /g,'+')
        //将base64转换buffer
        let buffer = Buffer.from(base64, 'base64');
        //生成文件名
        let filename = Math.random().toString().slice(2) + new Date().getTime() + '.' + type;

        //使用文件系统将Buffer写入服务器中
        //writeFile()异步方式
        fs.writeFile(__basename + '/upload/upload-img/' + filename, buffer, (err) => {
            if (err) {
                //上传失败
                reject(err);
                // res.send({ msg: '上传文件失败', status: 1061 })
            } else {
                // res.send({ msg: '文件上传成功',status:1060 })
                resolve(filename);
            }
        })
        })
    }

}

module.exports = new Utils();