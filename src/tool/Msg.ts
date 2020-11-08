
const msgInfo  = {
  NOTMOBILE: '请输入正确的手机号|601',
  FAIL: '系统错误|500',
  SEND_SMSCODE_SUCCESS: '发送短信验证码成功',
  SEND_SMSCODE_FAIL: '发送短信验证码失败|501',
  SEND_SMSCODE_LIMIT: '验证码发的太快啦，请稍后再试|502',
  CHECKSMS_EXPIRE: '验证码过期，请重新获取|503',
  LOGIN_SUCCESS: '登录成功',
  SUCCESS: '操作成功',
  CREATE_USER_FAIL: '创建用户失败|504',
  CHECKSMS_FAIL: '验证码错误|505',
  NOTLOGIN: '没有登录|506',
  UPDATE_USERINFO_SUCCESS: '更新用户信息成功',
  FILE_UPLOAD_ERROR: '文件上传失败|507',
  PARAMETER_ERROR: '参数错误|508',
  ALREADY_FRIENDS: '你们已经是好友啦|509',
  ALREADY_FRIEND_APPLY: '您已经发起过好友申请啦|510',
  ID_NOT_EXISTENT: 'Unable to query the corresponding data according to the ID|511',
  NO_AUTHORITY: '抱歉，您没有此操作的权限！|512',
  ALREADY_DEAL: '不能进程重复的操作|512'
}

type msgInfoType = keyof typeof msgInfo

var msgs = msgInfo

Object.keys(msgInfo).forEach((key: string)=> {
  var info = msgInfo[key as msgInfoType].split('|')
  var msg = {}
  if (info[0]) Object.assign(msg, { msg: info[0] })
  if (info[1]) {
    Object.assign(msg, { code: info[1] })
  } else {
    Object.assign(msg, { code: 200 })
  }
  Object.assign(msgs, {
    [key]: msg
  })
})

export = msgs