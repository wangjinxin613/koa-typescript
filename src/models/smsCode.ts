// 短信验证码模型

var Sequelize = require('sequelize')
var sequelize = require('../lib/sequelize')

export default sequelize.define('sms_code', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  mobile: Sequelize.STRING(255),
  code: Sequelize.STRING(255)
}, {
  timestamps: true
})