import * as fs from 'fs'
import * as path from 'path'
import * as compose from 'koa-compose'
import { Context } from 'koa'

function getDirs (srcpath: any) {
  return fs.readdirSync(srcpath).filter(file => {
    return fs.statSync(path.join(srcpath, file)).isDirectory()
  })
}

export default (srcpath: any, filename = 'index.js') => {
  const plugins: object = {}
  const dirs = getDirs(srcpath)
  const list = []

  for (const name of dirs) {
    let fn = require(path.join(srcpath, name, filename))

    if (typeof fn !== 'function' && typeof fn.default === 'function') {
      fn = fn.default
    } else {
      throw (new Error('plugin must be a function!'))
    }

    // plugins[name] = fn ß
    Object.assign(plugins, {
      name: fn
    })

    list.push(function (ctx: Context, next: any) {
      return fn(ctx, next) || next()
    })
  }

  console.log(list);

  return compose(list)
}
