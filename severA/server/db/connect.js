let { Sequelize } = require('sequelize');

//连接mysql
let { database, username, password, host, dialect, timezone, underscored } = config.mysqlOptions;
let sequelize = new Sequelize(database, username, password, {
    // 数据库地址
    host: host,
    // 数据库类型
    dialect: dialect,
    //时区
    timezone: timezone,
    //字段命名 以 _ 分隔
    define: {
        underscored: underscored
    }
})

module.exports = sequelize;