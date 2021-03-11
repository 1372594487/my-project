//------------------------------
//User_Product表
//------------------------------
let {DataTypes,Model} = require('sequelize');
class UserProduct extends Model{}

//定义模型结构，数据表结构
UserProduct.init(
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
     //逻辑外键，关联用户id
     userId:{
        type:DataTypes.STRING(30),
        allowNull:false,
        //默认值
        defaultValue:'',
        comment:'用户id'
     },
     pid:{
        type:DataTypes.STRING(30),
        allowNull:false,
        //默认值
        defaultValue:'',
        comment:'商品id'
    },
    },{
        //指定连接实例,在指定数据库创建userProduct表
        sequelize,
        //模型名称,当没有指定表明时，sequelize推断表名
        // 为模型名称的复述 userProducts ==>作为表名
        modelName:'userProduct',
        // 不推断，直接使用魔性作为表明 ==>userProduct作为表名
        freezeTableName:true,
        //指定表名
        tableName:'user_product'
    }
)
//同步数据表
//force:true ==> 删除原有userProduct表，新建userProduct表
//force:false ==>如果userProduct表存在，不创建；反之创建
UserProduct.sync({force:false});

module.exports = UserProduct; 