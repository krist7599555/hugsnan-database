import Router = require("koa-router");
import user from "./user/index";
import post from "./post/index";
import upload from "./upload/index";
var router = new Router();
const logger = require("koa-logger");

router
  .prefix("/api")
  .use(logger())
  .get("/", ctx => ctx.ok("this is API"))
  .use(user.routes())
  .use(user.allowedMethods())
  .use(post.routes())
  .use(post.allowedMethods())
  .use(upload.routes())
  .use(upload.allowedMethods());

export default router;
