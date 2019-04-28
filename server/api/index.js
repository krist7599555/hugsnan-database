import Router from "koa-router"
import user from "./user/index"
import post from "./post/index"
import upload from "./upload/index"
import line from "./line/index"

const router = new Router()
const logger = require("koa-logger")
const skip = require("koa-ignore")
const respond = require("koa-respond")

const mongo = require("koa-mongo")
const response = require("koa-respond")
const bodyParser = require("koa-bodyparser")
const cors = require("koa2-cors")
const send = require("koa-send")
const mount = require("koa-mount")

const config = require("../../nuxt.config")

router
  .prefix("/api")
  .use(respond())
  .use(bodyParser())
  .use(mongo(config.mongo))
  .use(skip(logger()).if(() => process.env.JEST))
  .get("/", ctx => ctx.ok("API"))
  .use(user.routes())
  .use(user.allowedMethods())
  .use(post.routes())
  .use(post.allowedMethods())
  .use(upload.routes())
  .use(upload.allowedMethods())
  .use(line.routes())
  .use(line.allowedMethods())

export default router
