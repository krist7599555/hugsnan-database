import Router = require("koa-router");
import * as _ from "lodash";
import { nextTick } from "q";
var router = new Router();

const data = require("./data.json");
router
  .prefix("/post")
  .get("/", ctx => {
    ctx.body = "OK";
  })
  .use(async (ctx, next) => {
    ctx.body = await data;
    next();
  })
  .get("/all", (ctx, next) => {
    return;
  })
  .get("/tags/:tags", (ctx, next) => {
    ctx.body = _.filter(ctx.body, p => _.includes(p.tags, ctx.params.tags));
    next();
  })
  .get("/:id", (ctx, next) => {
    ctx.body = _.filter(ctx.body, p => p.id == ctx.params.id)[0];
    next();
  })
  .use(ctx => {
    if (!ctx.body) ctx.noContent();
  });

export default router;
