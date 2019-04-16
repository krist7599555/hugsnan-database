import Router = require("koa-router");
import * as _ from "lodash";
const mongo = require("koa-mongo");

var router = new Router();

router
  .prefix("/post")
  .get("/", ctx => {
    ctx.body = "OK";
  })
  .get("/all", async (ctx, next) => {
    ctx.body = await ctx.db
      .collection("posts")
      .find()
      .toArray();
  })
  .post("/create", async ctx => {
    const body = ctx.request.body;
    console.log(body);
    const result = await ctx.db.collection("posts").insert(body);
    const postId = result.ops[0]._id.toString();
    ctx.body = (await ctx.db
      .collection("posts")
      .find({
        _id: mongo.ObjectId(postId)
      })
      .toArray())[0];
  })
  .get("/:id", async ctx => {
    console.log(ctx.params.id);
    ctx.body = (await ctx.db
      .collection("posts")
      .find({
        _id: mongo.ObjectId(ctx.params.id)
      })
      .toArray())[0];
  })
  .use(ctx => {
    if (!ctx.body) ctx.noContent();
  });

export default router;
