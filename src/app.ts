import "reflect-metadata"
import * as Koa from 'koa'
import * as KoaBody from 'koa-body'
import {
  System as SystemConfig
} from './config'
import * as path from 'path'
import MainRoutes from './routes/main-routes'
import ErrorRoutesCatch = require('./middleware/ErrorRoutesCatch')
import ErrorRoutes = require('./routes/error-routes')
import * as jwt from 'koa-jwt'
import * as fs from 'fs'
import './lib/sequelize'
const staticFiles = require('koa-static')
// import * as PluginLoader from './lib/PluginLoader'

const app = new Koa()
const env = process.env.NODE_ENV || 'development' // Current mode

const publicKey = fs.readFileSync(path.join(__dirname, '../publicKey.pub'))

app
  .use((ctx: Koa.Context, next) => {
    if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
      ctx.set('Access-Control-Allow-Origin', '*')
    } else {
      ctx.set('Access-Control-Allow-Origin', SystemConfig.HTTP_server_host)
    }
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    // ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
    return next()
  })
  .use(ErrorRoutesCatch())
  .use(jwt({ secret: publicKey, key: 'user', passthrough: true }).unless({ path: [/^\/public|\/user\/login|\/assets|\//] }))
  .use(staticFiles(path.join(__dirname, '..','assets')))
  .use(KoaBody({
    multipart: true,
    parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'], // parse GET, HEAD, DELETE requests
    // formidable: {
    //   uploadDir: path.join(__dirname, '../assets/uploads/tmp')
    // },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
  })) // Processing request
  .use(async (ctx: Koa.Context, next: any) => {
    ctx.params = {
      ...ctx.request.body,
      ...ctx.query
    };
    await next();
  })
  // .use(PluginLoader(SystemConfig.System_plugin_path))
  .use(MainRoutes.routes())
  .use(MainRoutes.allowedMethods())
  .use(ErrorRoutes())


if( env === 'development') { // logger
  app.use((ctx: Koa.Context, next: any) => {
    const start = new Date()
    return next().then(() => {
      const ms = new Date().getTime() - start.getTime()
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  })
}

app.listen(SystemConfig.API_server_port)

console.log('Now start API server on port ' + SystemConfig.API_server_port + '...')

export default app
