// import { httpRequest } from '../http/index'
import { SendSmsCode } from '../../config'

const SMSClient = require('@alicloud/sms-sdk')
const { accessKeyId, secretAccessKey } = SendSmsCode

// 发送短信验证
export function sendSmsCodeRequest (mobile: string, code: number) {
  // 初始化sms_client
  const smsClient = new SMSClient({ accessKeyId, secretAccessKey })
  // 发送短信
  return smsClient.sendSMS({
    PhoneNumbers: mobile,
    SignName: '测试',
    TemplateCode: 'SMS_109535224',
    TemplateParam: '{"code":"' + code + '"}'
  })
}
