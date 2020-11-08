import { Sequelize } from 'sequelize-typescript';
import { DB as DBConfig, System as SystemConfig } from '../config'
import * as path from 'path';
// import fridens from '../models/friends'; 
 const sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
  host: DBConfig.host,
  dialect: 'mysql',
  port: DBConfig.port,
  dialectOptions: { // MySQL > 5.5，其它数据库删除此项
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_520_ci',
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  pool: {
    max: 50,
    min: 0,
    idle: 10000
  },
  define: {
    underscored: true,
    timestamps: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  },
  timezone: '+08:00', // 东八时区
  logging: false // 阻止sequelize输出到控制台
})

console.log(path.resolve(__dirname, `../models/friends.ts`))

//sequelize.addModels([fridens])


module.exports = sequelize;

//sequelize.addModels([path.resolve(__dirname, `../models/friends.js`)])
