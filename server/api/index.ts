import Router = require("koa-router");
import user from "./user/index";
import post from "./post/index";
import upload from "./upload/index";
import line from "./line/index";
var router = new Router();
const logger = require("koa-logger");
let skip = require("koa-ignore");
router
  .prefix("/api")
  .use(skip(logger()).if(() => process.env.JEST))
  .get("/", ctx => ctx.ok("API"))
  .use(user.routes())
  .use(user.allowedMethods())
  .use(post.routes())
  .use(post.allowedMethods())
  .use(upload.routes())
  .use(upload.allowedMethods())
  .use(line.routes())
  .use(line.allowedMethods());

export default router;
