import { Context } from "koa"

export = function () {
  return function (ctx: Context, next: any) {
    switch (ctx.status) {
      case 404:
        ctx.body = '没有找到内容 - 404'
        break
    }
    return next()
  }
}
