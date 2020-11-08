// 用户模型
import { Table, Column, Model,BelongsTo, ForeignKey,DataType } from 'sequelize-typescript'
var sequelize = require('../lib/sequelize')
import * as path from 'path';

@Table({
  tableName: 'users',
  timestamps: true
})
export default class User extends Model<User> {
  @Column({
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  })
  id: number
  
  @Column
  openid: string

  @Column
  nickName: string // 昵称

  @Column({
    defaultValue: 0,
    comment: '性别'
  })
  gender: number

  @Column
  city: string

  @Column
  province: string 

  @Column
  country: string // 国家

  @Column
  avatarUrl: string // 头像

  @Column({
    defaultValue: 'mobile'
  })
  platformType: string // 平台类型 mobile weixin qq weibo
  
  @Column
  mobile: string // 手机号
  
  @Column({
    comment: '常住地'
  })
  place: string

  @Column({
    comment: '定位'
  })
  location: string

  @Column({
    comment: '个人签名',
    type: DataType.TEXT
  })
  mood: string

  @Column({
    comment: '生日',
    type: DataType.DATEONLY
  })
  birthday: string
}

sequelize.addModels([path.resolve(__dirname, `./user.ts`)])
