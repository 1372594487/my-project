//------------------------------
//Product_Type表
//------------------------------
let {DataTypes,Model} = require('sequelize');
class ProductType extends Model{}

//定义模型结构，数据表结构
ProductType.init(
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
     //逻辑外键，关联商品类型id
     type_id:{
        type:DataTypes.STRING(10),
        allowNull:false,
        //默认值
        defaultValue:'',
        comment:'商品类型id'
     },
     pid:{
        type:DataTypes.STRING(30),
        allowNull:false,
        //默认值
        defaultValue:'',
        comment:'商品id'
    },
    },{
        //指定连接实例,在指定数据库创建productType表
        sequelize,
        //模型名称,当没有指定表明时，sequelize推断表名
        // 为模型名称的复述 productTypes ==>作为表名
        modelName:'productType',
        // 不推断，直接使用魔性作为表明 ==>productType作为表名
        freezeTableName:true,
        //指定表名
        tableName:'product_Type'
    }
)
//同步数据表
//force:true ==> 删除原有productType表，新建productType表
//force:false ==>如果productType表存在，不创建；反之创建
ProductType.sync({force:false});

module.exports = ProductType; 