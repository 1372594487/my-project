//------------------------------
//User表
//------------------------------
let {DataTypes,Model} = require('sequelize');
class User extends Model{}

//定义模型结构，数据表结构
User.init(
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
     userId:{
         type:DataTypes.STRING(30),
         allowNull:false,
         //默认值
         defaultValue:'',
         comment:'用户id'
     },
     nickName:{
        type:DataTypes.STRING(30),
        allowNull:false,
        //默认值
        defaultValue:'',
        comment:'昵称'
     },
     password:{
         type:DataTypes.STRING(32),
         allowNull:false,
         defaultValue:'',
         comment:'密码'
     },
     email:{
         type:DataTypes.STRING(40),
         allowNull:false,
         //默认值
         defaultValue:'',
         comment:'邮箱'
     },
     phone:{
         type:DataTypes.STRING(11),
         allowNull:true,
         defaultValue:null,
         comment:'手机号'
     },
     gender:{
         type:DataTypes.BOOLEAN,
         allowNull:false,
         //0为女，1为男，2保密
         defaultValue:2,
         comment:'用户性别:0为女，1为男，2保密'
     },
     avater:{
         type:DataTypes.STRING(100),
         allowNull:false,
         defaultValue:'default.jpg',
         comment:'用户头像'
     }  
    },{
        //指定连接实例,在指定数据库创建user表
        sequelize,
        //模型名称,当没有指定表明时，sequelize推断表名
        // 为模型名称的复述 users ==>作为表名
        modelName:'user',
        // 不推断，直接使用魔性作为表明 ==>user作为表名
        freezeTableName:true,
        //指定表名
        tableName:'user'
    }
)
//同步数据表
//force:true ==> 删除原有user表，新建user表
//force:false ==>如果user表存在，不创建；反之创建
User.sync({force:false});

module.exports = User; 