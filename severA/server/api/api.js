//
const { QueryTypes } = require('sequelize');
//操作mysql 的 api
class API {
    //创建数据
    createData(modelName, o,t) {
        //modelName，模型名称
        //返回promise
        //o:创建的数据，类型：object
        //t:事务处理对象
        return t ? model[modelName].create(o,{transaction:t}) : model[modelName].create(o)
    }
    //删除
    removeData(modelName,condition,t){
        //modelName: 模型名称,string
        //condition:条件,object
        //t:事务处理对象，object
        if(t){
            return model[modelName].destroy({
                where:condition,
                transaction:t,
            })
        }
        return model[modelName].destroy({
            where:condition
        })
    }

    // 更新
    updateData(modelName,values,condition,t){
        //modelName: 模型名称,string
        //values:更新数据,object
        //condition:条件,object
        //t:事务处理对象，object
        if(t){
            return model[modelName].update(values,{
                where:condition,
                transaction:t
            })
        }
        return model[modelName].update(values,{
            where:condition
        })
    }

    // 查询
    findData(o){
        //o.modelName:模型名称，string
        //o.condition:查询条件，object
        // o.attributes:查询字段，array ==> ['a','b']
        // 获具有别名 ['a',['b','b别名']]
        return model[o.modelName].findAll({
            where:o.condition,
            attributes:o.attributes,
        })
    }

    //事务处理
    transaction(fn){
        return sequelize.transaction(fn)
    }
    //原始查询
    query(sql,replacements){
        //sql:SQL语句，String
        //replacements: 替换sql语句的内容,Object
        return sequelize.query(sql,{
            replacements,
            type:QueryTypes.SELECT
        });
    }

    // ...
}
module.exports = new API()