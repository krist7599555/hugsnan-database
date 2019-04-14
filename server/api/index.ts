import Router = require("koa-router");
import user from "./user/index";
import post from "./post/index";
var router = new Router();

router
  .prefix("/api")
  .get("/", ctx => ctx.ok("this is API"))
  .use(user.routes())
  .use(user.allowedMethods())
  .use(post.routes())
  .use(post.allowedMethods());

export default router;
