//收集所有模型
//导入User模型
let User = require(__basename + '/db/model/user.js')
//
let Code = require(__basename + '/db/model/code.js')
//
let Type = require(__basename + '/db/model/type.js')
//
let Product = require(__basename + '/db/model/product.js')
//
let UserProduct = require(__basename + '/db/model/user_product.js')
//
let ProductType = require(__basename + '/db/model/product_type.js')

module.exports = {
    User,
    Code,
    Type,
    Product,
    UserProduct,
    ProductType
}