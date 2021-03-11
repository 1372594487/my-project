//------------------------------
//Type表
//------------------------------
//导入type.js初始化商品类型数据
let typeData = require(__basename + '/db/data/type.js')

let {DataTypes,Model} = require('sequelize');
class Type extends Model{}

//定义模型结构，数据表结构
Type.init(
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
     type_id:{
        type:DataTypes.STRING(30),
        allowNull:false,
        //默认值
        defaultValue:'',
        comment:'商品类型id'
     },
     type:{
        type:DataTypes.STRING(20),
        allowNull:false,
        defaultValue:'',
        comment:'商品类型'
     },
    
    },{
        //指定连接实例,在指定数据库创建type表
        sequelize,
        //模型名称,当没有指定表明时，sequelize推断表名
        // 为模型名称的复述 types ==>作为表名
        modelName:'type',
        // 不推断，直接使用魔性作为表明 ==>type作为表名
        freezeTableName:true,
        //指定表名
        tableName:'type'
    }
)
//同步数据表
//force:true ==> 删除原有type表，新建type表
//force:false ==>如果type表存在，不创建；反之创建
Type.sync({force:false}).then(result=>{
    // console.log("result ==>",result);
    // typeData.map(v =>{
    //     Type.create(v);
    // })
}).catch(err=>{
    console.log("初始化商品类型出错");
});

module.exports = Type; 