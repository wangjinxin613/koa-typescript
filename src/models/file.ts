var Sequelize = require('sequelize')
var sequelize = require('../lib/sequelize')

const fileModel = sequelize.define('file', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  name: Sequelize.STRING(255),
  path: Sequelize.STRING(255),
  type: Sequelize.STRING(255),
  size: Sequelize.STRING(255),
  fileType: Sequelize.STRING(255),
  fileExtension: Sequelize.STRING(255),
  extJson: Sequelize.JSON()
}, {
  timestamps: true
})

fileModel.sync({
  force: false
})

export default fileModel
