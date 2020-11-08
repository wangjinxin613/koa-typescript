import * as KoaRouter from 'koa-router'
import controllers from '../controllers'
import { Context } from 'koa'
import * as path from 'path'
const multer = require('koa-multer');
const { user, upload: uploadController } = controllers

const router = new KoaRouter()

console.log(path.join(__dirname, '../../assets/uploads'))

//文件上传配置 
var storage =  multer.diskStorage({
  destination: path.join(__dirname, '../../assets/uploads'),
  filename: (ctx: any, file: any, cb: any)=>{
    let type = file.originalname.split('.')[1]
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
  }
});
var upload = multer({ storage: storage })

router
  .get('/', (ctx: Context) => {
    ctx.body = 'hello world'
  })
  .get('/public/get', function (ctx: Context) {
    ctx.body = '你好啊！'
  }) // 以/public开头则不经过权限认证
  .post('/upload',upload.single('file'),uploadController.upload)
  .get('/getFile',uploadController.getFile)
  .get('/getFileInfo',uploadController.getFileInfo)

// 用户登录相关
router
  .post('/user/login', user.login)
  .post('/user/sendSmsCode', user.sendSmsCode)
  .post('/user/checkSmsCode', user.checkSmsCode)
  .get('/user/checkAuth', user.CheckAuth)
  .post('/user/updateUserInfo', user.updateUserInfo)



export default router
