import { getUserInfoService } from '../services/user';
import * as Msg from '../tool/Msg';

// 截取字符串，多余的部分用...代替
export const setString = (str: string, len: number) => {
  let StrLen = 0
  let s = ''
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 128) {
      StrLen += 2
    } else {
      StrLen++
    }
    s += str.charAt(i)
    if (StrLen >= len) {
      return s + '...'
    }
  }
  return s
}

// 格式化设置
// export const OptionFormat = (GetOptions) => {
//   let options = '{'
//   for (let n = 0; n < GetOptions.length; n++) {
//     options = options + '\'' + GetOptions[n].option_name + '\':\'' + GetOptions[n].option_value + '\''
//     if (n < GetOptions.length - 1) {
//       options = options + ','
//     }
//   }
//   return JSON.parse(options + '}')
// }

// 替换SQL字符串中的前缀
// export const SqlFormat = (str) => {
//   if (SystemConfig.mysql_prefix !== 'api_') {
//     str = str.replace(/api_/g, SystemConfig.mysql_prefix)
//   }
//   return str
// }

// 数组去重
// export const HovercUnique = (arr: number[] | string[]) => {
//   const n = {}
//   const r = []
//   for (var i = 0; i < arr.length; i++) {
//     if (!n[arr[i]]) {
//       n[arr[i]] = true
//       r.push(arr[i])
//     }
//   }
//   return r
// }

// 获取json长度
// export const getJsonLength = (jsonData) => {
//   var arr = []
//   for (var item in jsonData) {
//     arr.push(jsonData[item])
//   }
//   return arr.length
// }

// 生成随机数
export function getRandom (upper: number, lower: number) : number{
  return Math.floor(Math.random() * (upper - lower)) + lower
}

export function objAssign (obj: object, params: string[]) : object {
  var res = {}
  type objType = keyof typeof obj
  for (let item of params) {
    if (typeof obj[item as objType] !== 'undefined') {
      res[item as objType] = obj[item as objType]
    }
  }
  return res
}


export async function mustLogin(ctx, fun) {
  var { body, method, query } = ctx.request;
  const userInfo = await getUserInfoService(ctx);
  if (!userInfo) return
  body.uid = userInfo.id;
  query.uid = userInfo.id;
  if(query.page) query.page = Number(query.page)
  if(query.size) query.size = Number(query.size)
  try {
    var res = await fun(method == 'GET' ? query : body);
    ctx.body = res;
  } catch (error) {
    ctx.body = Msg.FAIL
  }
}
