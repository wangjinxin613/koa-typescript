/* eslint-disable no-unreachable */
import { sendSmsCodeRequest } from '../plugins/sendSmsCode/index'
import { getRandom, objAssign } from '../tool/Common'
import * as moment from 'moment'
import * as jwt from 'jsonwebtoken'
import * as fs from 'fs'
import * as path from 'path'
import userModel from '../models/user';
import smsCodeModel from '../models/smsCode';
import Msg = require('../tool/Msg')

import { Context } from 'koa'
// var smsCodeModel = require('../models/smsCode')
const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

// Send sms code
export async function sendSmsCodeService (ctx: Context, next: any) {
  var { mobile, platformType } = ctx.request.body
  if (!mobile) ctx.body = Msg.NOTMOBILE
  if (platformType === 'mobile') {
    try {
      var smsCode : number = getRandom(1000, 9999)
      var res = await sendSmsCodeRequest(mobile, smsCode).catch((err: any) => {
        throw err
      })
      var { Code } = res
      if (Code === 'OK') {
        try {
          res = await smsCodeModel.create({
            mobile,
            code: smsCode
          })
          ctx.body = Object.assign(Msg.SEND_SMSCODE_SUCCESS, { id: res.id })
        } catch (error) {
          console.error(error)
          ctx.body = Msg.SEND_SMSCODE_FAIL
        }
      }
    } catch (error) {
      console.log(error.code)
      if (error.code === 'isv.BUSINESS_LIMIT_CONTROL') ctx.body = Msg.SEND_SMSCODE_LIMIT
      else ctx.body = Msg.FAIL
    }
  }
  next()
}

// Check sms code, if correct, log in directly
export async function checkSmsCodeServeice (ctx: Context) {
  var { codeId, code, mobile } = ctx.request.body
  try {
    var obj = await smsCodeModel.findOne({
      where: {
        id: codeId,
        code,
        mobile
      }
    })
    if (obj && obj.id) {
      // The validity of captcha is 5 minutes
      if (moment().unix() - moment(obj.createTime).unix() > 60 * 5) {
        ctx.body = Msg.CHECKSMS_EXPIRE
        return
      }
      var count = await userModel.count({
        where: { mobile }
      })
      // First login create user
      var userInfo = {}
      if (count === 0) {
        try {
          userInfo = await userModel.create({
            mobile,
            nickName: '快友用户' + getRandom(1000, 9999),
            platformType: 'mobile'
          })
        } catch (error) {
          ctx.body = Msg.CREATE_USER_FAIL
        }
      } else {
        userInfo = await userModel.findOne({where:{mobile}})
      }
      // Token effective time 365 days
      var token = jwt.sign({ userInfo: userInfo }, publicKey, { expiresIn: '7d' })
      ctx.body = Object.assign(Msg.LOGIN_SUCCESS, { data: userInfo, token })
    } else {
      ctx.body = Msg.CHECKSMS_FAIL
    }
  } catch (error) {
    ctx.body = Msg.FAIL
  }
}

// get user info by userid
export async function getUserInfoService (ctx: Context, next?: any) {
  try {
    const token = ctx.request.header.authorization
    const decoded : any = jwt.verify(token, publicKey)
    if (decoded.userInfo) {
      var res = await userModel.findOne({
        where: { id: decoded.userInfo.id }
      })
      if(res.avatarUrl == null || res.avatarUrl == '') {
        //res.avatarUrl = 'http://' + ctx.request.headers.host + '/headimg.jpg'
      } else {
        res.avatarUrl = 'http://' + ctx.request.headers.host + '/getFile?fileName=' + res.avatarUrl
      }
      return res
    } else {
      ctx.body = Msg.NOTLOGIN
      return false
    }
  } catch (err) {
    ctx.body = Msg.NOTLOGIN
    return false
  }
}

// Update userinfo
export async function updateUserInfoService (ctx: Context, next: any) {
  var { body } = ctx.request
  var userInfo = await getUserInfoService(ctx, next)
  if (!userInfo) return
  try {
    await userModel.update(objAssign(body, ['nickName', 'avatarUrl', 'birthday', 'gender', 'place', 'mood']), {
      where: { id: userInfo.id }
    })
    ctx.body = Msg.UPDATE_USERINFO_SUCCESS
  } catch (error) {
    ctx.body = Msg.FAIL
  }
}
