import * as fs from 'fs'
import * as path from 'path'
import { System as SystemConfig } from '../config'
import { Context } from 'koa'
import * as moment from 'moment'
import { FILE_UPLOAD_ERROR } from '../tool/Msg';
import fileModel from '../models/file';

/**
 * upload file
 * @param ctx 
 * @param next 
 */
export const upload = async (ctx: Context, next: any) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'X-Requested-With')
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')

  var file = ctx.request.files.file;
  var { type, extJson} = ctx.request.body;
  var singfileArray = file.name.split('.');
  var fileExtension = singfileArray[singfileArray.length - 1];
  var fileInfo = {};
  Object.assign(fileInfo, {
    fileExtension: fileExtension ?? '',
    fileType: type,
    extJson: extJson,
    size: file.size,
    name: file.name,
    path: file.path,
    type: file.type
  })
  try {
    var res = await fileModel.create(fileInfo)
    ctx.body = res;
  } catch (error) {
    ctx.body = FILE_UPLOAD_ERROR;
  }
  // ctx.body = fileInfo;
  next()
}

/**
 * get a file
 * @param ctx 
 * @param next 
 */
export const getFile = async (ctx: Context, next: any) => {
  var fileName = ctx.request.query.fileName;
  var res = await fileModel.findOne({
    where: { name: fileName }
  })
  var content =  fs.readFileSync(res.path,"binary");   
  ctx.res.writeHead(200, "Ok");
  ctx.res.write(content,"binary");
  ctx.res.end();
  next()
}

/**
 * get file info
 * @param ctx 
 * @param next 
 */
export const getFileInfo = async (ctx: Context, next: any) => {
  var fileName = ctx.request.query.fileName;
  var res = await fileModel.findOne({
    where: { name: fileName }
  })
  ctx.body = res
  next()
}