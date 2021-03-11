//------------------------------
//Product表
//------------------------------
let {DataTypes,Model} = require('sequelize');
class Product extends Model{}

//定义模型结构，数据表结构
Product.init(
    {
     id:{
         //数据类型：INTEGER整形，UNSINGED无符号
         type:DataTypes.INTEGER.UNSIGNED,
         //自动递增
         autoIncrement:true,
         //主键
         primaryKey:true,
         //不允许为null
         allowNull:false,
         //注释
         comment:'表id'
     },
     pid:{
         type:DataTypes.STRING(30),
         allowNull:false,
         //默认值
         defaultValue:'',
         comment:'商品id'
     },
     name:{
        type:DataTypes.STRING(6),
        allowNull:false,
        defaultValue:'',
        comment:'商品名称'
     }, 
     price:{
         type:DataTypes.DECIMAL(40,2),
         allowNull:false,
         //默认值
         defaultValue:0,
         comment:'价格'
     },
     priceType:{
        type:DataTypes.STRING(30),
        allowNull:false,
        defaultValue:'',
        comment:'价格单位'
     },
     state:{
        type:DataTypes.STRING(2),
        allowNull:false,
        defaultValue:'',
        comment:'商品状态'
     },
     desc:{
        type:DataTypes.STRING(30),
        allowNull:false,
        defaultValue:'',
        comment:'商品描述'
     },
     img:{
        type:DataTypes.STRING(50),
        allowNull:false,
        defaultValue:'',
        comment:'商品图片'
     }  
     
    },{
        //指定连接实例,在指定数据库创建product表
        sequelize,
        //模型名称,当没有指定表明时，sequelize推断表名
        // 为模型名称的复述 products ==>作为表名
        modelName:'product',
        // 不推断，直接使用魔性作为表明 ==>product作为表名
        freezeTableName:true,
        //指定表名
        tableName:'product'
    }
)
//同步数据表
//force:true ==> 删除原有product表，新建product表
//force:false ==>如果product表存在，不创建；反之创建
Product.sync({force:false});

module.exports = Product;  