//------------------------------
//Code表
//------------------------------
let {DataTypes,Model} = require('sequelize');
class Code extends Model{}

//定义模型结构，数据表结构
Code.init(
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
     codeId:{
         type:DataTypes.STRING(30),
         allowNull:false,
         //默认值
         defaultValue:'',
         comment:'验证码id'
     },
     text:{
        type:DataTypes.STRING(6),
        allowNull:false,
        defaultValue:'',
        comment:'验证码'
     },
     email:{
         type:DataTypes.STRING(40),
         allowNull:false,
         //默认值
         defaultValue:'',
         comment:'邮箱'
     },
    },{
        //指定连接实例,在指定数据库创建code表
        sequelize,
        //模型名称,当没有指定表明时，sequelize推断表名
        // 为模型名称的复述 codes ==>作为表名
        modelName:'code',
        // 不推断，直接使用魔性作为表明 ==>code作为表名
        freezeTableName:true,
        //指定表名
        tableName:'code'
    }
)
//同步数据表
//force:true ==> 删除原有code表，新建code表
//force:false ==>如果code表存在，不创建；反之创建
Code.sync({force:true});

module.exports = Code; 