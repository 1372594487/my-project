//---------------------
//路由控制器
//---------------------


// 导入API，操作mysql
let api = require(__basename + '/api/api.js')
//导入utils，调用公共方法
let utils = require(__basename + '/utils/utils.js')


class routesController {
    //测试接口
    test(req, res) {
        res.send('test succeed')
    }
    //请求域拦截
    verifyHost(req, res, next) {
        if (config.hostOptions.indexOf(req.headers.origin) === -1) {
            console.log("pass", config.hostOptions, "your", req.headers.origin);
            return res.send({ msg: '请求域不合法', status: 1020 });
        }
        //否则允许通过
        next();
    }
    //验证码拦截
    verifyCode(req, res, next) {
        let url = req.url.split('?')[0];
        if (config.codeUrlOptions.indexOf(url) > -1) {
            //验证验证码
            console.log('req.body ==> ', req.body);
            //根据codeId查询验证码信息
            api.findData({
                modelName: 'Code',
                condition: {
                    codeId: req.body.codeId
                }
            }).then(result => {
                console.log("result ==> ", result);
                //获取当前时间-5mins
                let time = new Date().getTime() - config.emailOptions.expires;
                let codeTime = new Date(result[0].dataValues.createdAt).getTime();
                let isPass = req.body.validcode == result[0].dataValues.text && req.body.email == result[0].dataValues.email && codeTime >= time;
                // 如果验证码保存时间 >= time
                if (isPass) {
                    //如果验证通过，则将请求传递给下一个中间件或者路由
                    next();
                } else {
                    res.send({ msg: "验证码错误", status: 1031 })
                }
            }).catch(err => {
                console.log("err ==> ", err);
                res.send({ msg: '验证码错误', status: 1031 })
            })
        } else {
            //无需验证验证码，直接将请求传递给下一个中间件或者路由
            next();
        }
    }
    //验证登录
    verifyToken(req, res, next) {
        console.log('经过验证token');
        let url = req.url.split('?')[0];
        let judge = config.tokenOptions.tokenUrls.indexOf(url) > -1;
        if (judge) {
            console.log("req.headers.cookie ==> ", req.headers.cookie);
            if (!req.headers.cookie) {
                return res.send({ msg: '请先登录', status: 1034 });
            }
            let cookie = utils.transformCookie(req.headers.cookie);
            let token = [cookie.kaosd12, cookie.nanaasd, cookie.mamaawe].join('.');
            console.log('token ==>', token);
            //验证token
            utils.verifyToken(token).then(result => {
                console.log("result ==>", result);
                //传递userId
                req.userId = result.data;
                //验证通过，传递给下一个中间件或者路由
                next();
            }).catch(err => {
                res.send({ msg: '请先登录', status: 1034 });
            })
        } else {
            next();
        }
    }

    //注册接口
    register(req, res) {
        //插入数据 ==> 模型.create(创建数据对象)

        //查询邮箱是否已被注册
        api.findData({
            modelName: 'User',
            condition: {
                email: req.body.email
            },
            attributes: ['email']
        }).then(result => {
            // console.log("result ==> ",result);
            // res.send('find ok')
            if (result.length > 0) {
                res.send({ msg: '该邮箱已被注册', status: 1002 })
            } else {
                //注册
                //创建用户id
                let userId = '_uid' + new Date().getTime();
                //随机昵称
                let index = Math.floor(Math.random() * config.nickNameOptions.length);
                let nickName = config.nickNameOptions[index] + userId;
                //加密密码
                let password = utils.encodeString(req.body.password);
                console.log('password ==>', password);
                //添加用户数据，注册用户
                api.createData('User', {
                    email: req.body.email,
                    password,
                    nickName,
                    userId
                }).then(result => {
                    res.send({ msg: '注册成功', status: 1000, result });
                }).catch(err => {
                    console.log('err ==> ', err);
                    res.send({ msg: '注册失败', status: 1001 })
                })
            }
        }).catch(err => {
            console.log("err==> ", err);
            res.send({ msg: '注册失败', status: 1001 })
        })


    }
    //发邮件
    email(req, res) {
        console.log("req.body", req.body.email);

        //生成随机验证码
        let code = utils.randomCode();
        console.log('code ==> ', code);
        //生成唯一id
        let codeId = 'cid' + new Date().getTime();
        //先存储验证码，再发邮件给用户
        api.createData('Code', {
            email: req.body.email,
            codeId,
            text: code
        }).then(result => {
            console.log('result.dataValues ==> ', result);
            if (result.dataValues) {
                res.send({ msg: `验证码已发至${result.email}`, status: 1010, cid: codeId });
                return
                //发邮件
                utils.sendEmail({
                    to: req.body.email,
                    subject: '验证码',
                    text: `验证码为${code},${config.emailOptions.expires / 1000 / 60}分钟内有效`
                }).then(result => {
                    console.log('result==> ', result);
                    res.send({ msg: `验证码已发至${result.accepted[0]}`, status: 1010, cid: codeId });
                }).catch(err => {
                    console.log("err==> ", err);
                    res.send({ msg: '发送验证码失败', status: 1001 })
                })
            } else {
                res.send({ msg: '发送验证码失败！', status: 1011 })

            }
        }).catch(err => {
            console.log('err ==> ', err);
            res.send({ msg: '发送验证码失败！', status: 1011 })
        })


    }
    //登录接口
    login(req, res) {
        // console.log('req.headers ==> ', req.headers);
        //根据邮箱查询用户信息
        api.findData({
            modelName: 'User',
            condition: {
                email: req.body.email
            },
            attributes: ['userId', 'password']
        }).then(result => {
            if (result.length > 0) {
                //验证密码
                let password = utils.encodeString(req.body.password)
                if (password == result[0].dataValues.password) {
                    //生成token：加密的字符串，一般用于身份验证，登录验证
                    console.log('result==>', result);
                    let token = utils.signToken(result[0].dataValues.userId)
                    //token切片
                    let ts = token.split('.');
                    let tsObj = {
                        kaosd12: ts[0],
                        nanaasd: ts[1],
                        mamaawe: ts[2],
                        //干扰项
                        nananab: 'sdfaSldfJoeQtmbCatgptRp'
                    }
                    // console.log('tsObj==> ', tsObj);
                    res.send({ msg: '登录成功', status: 1030, data: tsObj });
                } else {
                    //密码错误
                    res.send({ msg: '用户名或者密码不正确', status: 1032 })
                }
            } else {
                res.send({ msg: '用户名或密码不正确', status: 1033 })
            }
        }).catch(err => {
            console.log('err ==> ', err);
            res.send({ msg: '登录失败', status: 1031 })
        })
    }
    //和获取用户信息
    getUserInfo(req, res) {
        console.log("getUserInfo req.userId", req.userId);
        api.findData({
            modelName: 'User',
            condition: {
                userId: req.userId,
            }
        }).then(result => {
            let url = config.serverOptions.host;
            if (config.serverOptions.port) {
                url += `:${config.serverOptions.port}`
            }
            url += config.serverOptions.baseUrl + 'images/';

            res.send({
                msg: '查询用户信息成功', status: 1040, data: {
                    result,
                    url: url
                }
            })
        }).catch(err => {
            res.send({ msg: '查询用户信息失败', status: 1041 })
        })

    }
    //获取商品类型
    getTypeData(req, res) {
        console.log("getTypeData");
        // res.send({msg:'获取商品类型',status:1050})
        api.findData({
            modelName: 'Type'
        }).then(result => {
            console.log(result);
            res.send({ msg: '查询类型成功', status: 1050, result })
        }).catch(err => {
            console.log("查询商品失败", err);
            res.send({ msg: '查询类型失败', status: 1051, err })
        })
    }
    //发布商品
    postProduct(req, res) {
        //商品数据
        let promise = [
            utils.uploadImg(req.body.img, req.body.imgType)
        ];
        Promise.all(promise).then(result => {
            let productData = Object.assign(req.body);
            delete productData.imgType;
            productData.img = result[0]

            //商品类型id
            let typeId = productData.type;
            //生成商品id
            productData.pid = '_pid' + new Date().getTime();
            //删除商品类型
            delete productData.type;

            console.log("productData ==> ", productData);

            //启动事务处理
            api.transaction(t => {
                //t:事务处理对象
                return Promise.all([
                    // 01-将商品数据写入Product模型
                    api.createData('Product', productData, t),
                    // 02-将商品和用户关系写入UserProduct模型
                    api.createData('UserProduct', {
                        pid: productData.pid,
                        userId: req.userId
                    }, t),
                    // 03-将商品和商品类型关系写入ProductType模型
                    api.createData('ProductType', {
                        pid: productData.pid,
                        type_id: typeId
                    }, t),
                ])
            }).then(result => {
                res.send({ msg: '商品发布成功', status: 1060, result })
            }).catch(err => {
                console.log('err==> ', err);
                res.send({ msg: '商品发布失败', status: 1061 })
            })

        })
    }
    //搜索商品
    search(req, res) {
        console.log('req.query ==>', req.query);
        let sql = `SELECT p.createdAt AS date, p.pid AS pid, p.name AS pname, p.price AS price , p.priceType AS priType , t.type AS type , p.state AS state, p.desc AS pdesc ,p.img AS img FROM product AS p INNER JOIN product_type AS pt ON p.pid = pt.pid INNER JOIN type AS t ON pt.type_id = t.type_id  
        INNER JOIN user_product AS up ON p.pid = up.pid AND up.userId = :userId`
        // -- AND p.name LIKE '%鱼%'
        // -- AND t.type = '主食'
        // -- AND p.state = '上架'
        // AND p.createdAt LIKE '%2021-02-26%'

        let params = {
            userId: req.userId,
            offset: Number(req.query.offset),
            count: Number(req.query.count),

        }
        //判断是否有根据名称搜索
        if (req.query.name) {
            params.name = req.query.name;
            sql += ` AND p.name LIKE '%${req.query.name}%'`
        }
        if (req.query.type) {
            params.type = req.query.type;
            sql += ` AND t.type = :type`
        }

        if (req.query.updated_at) {
            params.start = `${req.query.updated_at} 00:00:00`;
            params.end = `${req.query.updated_at} 23:59:59`;
            sql += ` AND p.createdAt >= :start AND p.updatedAt <= :end`
        }
        if (req.query.status) {
            params.state = req.query.status
            sql += ` AND p.state = :state`
        }

        //进行排序分页
        sql += ` ORDER BY p.updatedAt LIMIT :count OFFSET :offset `

        api.query(sql, params).then(result => {
            res.send({ msg: '查询商品成功', status: 1070, result })
        }).catch(err => {
            console.log("err=>", err);
            res.send({ msg: '查询商品失败', status: 1071 })
        })


    }

    //根据条件查询商品总数目
    count(req, res) {
        let sql = `SELECT COUNT(p.pid) AS count 
        FROM product AS p INNER JOIN product_type AS pt ON p.pid = pt.pid INNER JOIN type AS t ON pt.type_id = t.type_id  
        INNER JOIN user_product AS up ON p.pid = up.pid AND up.userId = :userId`
        //
        let params = {
            userId: req.userId
        }
        if (req.query.name) {
            params.name = req.query.name;
            sql += ` AND p.name LIKE '%${req.query.name}%'`
        }
        if (req.query.type) {
            params.type = req.query.type;
            sql += ` AND t.type = :type`
        }

        if (req.query.updated_at) {
            params.start = `${req.query.updated_at} 00:00:00`;
            params.end = `${req.query.updated_at} 23:59:59`;
            sql += ` AND p.createdAt >= :start AND p.updatedAt <= :end`
        }
        if (req.query.status) {
            params.state = req.query.status
            sql += ` AND p.state = :state`
        }




        api.query(sql, params).then(result => {
            res.send({ msg: '查询商品数目成功', status: 1080, result })
        }).catch(err => {
            console.log("err=>", err);
            res.send({ msg: '查询商品数目失败', status: 1081 })
        })
    }

    //上下架
    switchState(req, res) {

        console.log("req.body ==>", req.body);
        //操作数据库
        api.updateData('Product', {
            state: req.body.status
        }, {
            pid: req.body.pid
        }).then(result => {
            console.log("result =>", result);
            res.send({ msg: '商品上下架状态成功改变', status: 1090, result });
        }).catch(err => {
            console.log("err ==>", err);
            res.send({ msg: '商品上下架状态更改失败', status: 1091 })
        })
    }

    //修改商品
    UpdateProduct(req, res) {
        console.log(req.body, req.query);
        let promise = [];
        let imgs = [];

        //商品数据
        let productData = Object.assign(req.body);

        //商品类型id
        let typeId = productData.type;
        //商品pid
        let pid = productData.pid;
        //整理数据，删除商品类型,图片类型,商品id
        delete productData.type;
        delete productData.imgType;
        delete productData.pid;
        console.log('productData ==>', productData);
        console.log('typeId', typeId);
        console.log({ pid });

        //如果存在图片，先上传图片，再更新商品数据
        if (req.body.img) {
            imgs.push('img')
            promise.push(utils.uploadImg(req.body.img, req.body.imgType))
        }
        if (promise.length > 0) {
            //等待图片上传完成后更新商品数据
            Promise.all(promise).then(result => {
                imgs.map((v, i) => {
                    productData[v] = result[i];
                })
                //是否存在更改类型
                if (typeId) {
                    //开始事务处理，更新Product,ProductType模型
                    api.transaction(async (t) => {
                        //更新商品数据
                        await api.updateData('Product', productData, { pid }, t);
                        //更新商品类型数据
                        await api.updateData('ProductType', { type_id: typeId }, { pid }, t);
                    }).then(r0 => {
                        res.send({ msg: '更新商品数据成功', status: 1100, result: r0 })
                    }).catch(err => {
                        console.log("err ==> ", err);
                        res.send({ msg: '更新商品数据失败', status: 1101 })
                    })
                } else {
                    api.updateData('Product', productData, {
                        pid
                    }).then(r1 => {
                        res.send({ msg: '更新商品数据成功', status: 1100, result: r1 })
                    }).catch(err => {
                        console.log("err ==> ", err);
                        res.send({ msg: '更新商品数据失败', status: 1101 })
                    })
                }
            }).catch(err => {
                console.log("err==> ", err);
                res.send({ msg: '更新商品数据失败', status: 1101 })
            })
        } else {
            //没有图片
            console.log('productData ==>', productData);
            console.log('typeId', typeId);
            console.log({ pid });
            //只有类型
            if (typeId && JSON.stringify(productData) == '{}') {
                api.updateData('ProductType', { type_id: typeId }, { pid }).then(r2 => {
                    res.send({ msg: '更新商品数据成功', status: 1100, result: r2 })
                }).catch(err => {
                    console.log("err ==> ", err);
                    res.send({ msg: '更新商品数据失败', status: 1101 })
                })
            } else if (typeId && JSON.stringify(productData) != '{}') {
                //开始事务处理，更新Product,ProductType模型
                api.transaction(async (t) => {
                    //更新商品数据
                    await api.updateData('Product', productData, { pid }, t);
                    //更新商品类型数据
                    await api.updateData('ProductType', { type_id: typeId }, { pid }, t);
                }).then(r3 => {
                    res.send({ msg: '更新商品数据成功', status: 1100, result: r3 })
                }).catch(err => {
                    console.log("err ==> ", err);
                    res.send({ msg: '更新商品数据失败', status: 1101 })
                })
            }
            else {
                api.updateData('Product', productData, {
                    pid
                }).then(r4 => {
                    res.send({ msg: '更新商品数据成功', status: 1100, result: r4 })
                }).catch(err => {
                    console.log("err ==> ", err);
                    res.send({ msg: '更新商品数据失败', status: 1101 })
                })
            }

        }


    }
    //删除商品
    removeProduct(req,res){
        //Product、ProductType、UserProduct模型数据
        //开启事务处理
        api.transaction(async (t)=>{
            //先删除从表数据
            await api.removeData('UserProduct',{
                pid:req.body.pid,
                userId:req.userId,
            },t)

            await api.removeData('ProductType',{
                pid:req.body.pid,
            },t)
            // 删除主表
            await api.removeData('Product',{
                pid:req.body.pid,
            },t)
        }).then(result => {
            console.log("result ==>",result);
            res.send({ msg: '删除商品数据成功', status: 1110})
        }).catch(err => {
            console.log("err ==> ", err);
            res.send({ msg: '删除商品数据失败', status: 1111})
        })
    }


}
//导出
module.exports = new routesController();