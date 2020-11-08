import { Context } from "koa"

export = function () : any {
  return function (ctx: Context, next: any) : any {
    return next().catch((err: any) => {
      switch (err.status) {
        case 401:
          ctx.status = 200
          ctx.body = {
            status: 401,
            result: {
              err: 'Authentication Error',
              errInfo: 'Protected resource, use Authorization header to get access.'
            }
          }
          break
        default:
          throw err
      }
    })
  }
}
