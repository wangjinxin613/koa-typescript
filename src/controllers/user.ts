// import jwt from 'jsonwebtoken'
// import fs from 'fs'
// import path from 'path'
import * as Msg from '../tool/Msg'
import { sendSmsCodeService, checkSmsCodeServeice, getUserInfoService, updateUserInfoService } from '../services/user'
import { Context } from 'koa'
// const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

/**
 * 检查授权是否合法
 */
export const CheckAuth = async (ctx: Context, next: any) => {
  var info = await getUserInfoService(ctx, next)
  if (!info) {
    ctx.body = Msg.NOTLOGIN
  } else {
    ctx.body = info
    next()
  }
}

// 登录
export function login (ctx: Context) {
  console.log(ctx)
}

// 发送短信验证码
export function sendSmsCode (ctx: Context, next: any) {
  return sendSmsCodeService(ctx, next)
}

// 校验短信验证码，如果验证码正确则直接登录
export function checkSmsCode (ctx: Context, next: any) {
  return checkSmsCodeServeice(ctx)
}

// 修改用户名和头像
export function updateUserInfo (ctx: Context, next: any) {
  return updateUserInfoService(ctx, next)
}
