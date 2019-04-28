import * as Router from "koa-router";
import * as _ from "lodash";
import { Db } from "mongodb";
// import config from "../../../nuxt.config";
// const mongo = require("koa-mongo");
import { ObjectId } from "koa-mongo";
// const Posts = mongo.db(config.mon);

const router = new Router<any, { db: Db }>();

const postFields = ["title", "tags", "url", "date", "html", "markdown"];

function toPostQuery(id: string) {
  try {
    return { _id: ObjectId(id) };
  } catch (e) {
    return { url: id };
  }
}

function postBodyChecker(ctx, next) {
  for (const v of postFields) {
    if (!ctx.request.body[v]) {
      return ctx.badRequest(`not found ${v} field`);
    }
  }
  return next();
}

router
  .prefix("/post")
  .get("/", ctx => {
    ctx.body = "OK";
  })
  .get("/tags/list", async ctx => {
    const arrOfTags = await ctx.db
      .collection("posts")
      // @ts-ignore
      .find({}, { fields: { tags: 1 } })
      .toArray();
    const tags = _.flattenDeep(_.map(arrOfTags, "tags"));
    ctx.body = _.uniq(tags);
  })
  .get("/all", async ctx => {
    // let tags = ctx.query["tags[]"];
    // if (typeof tags == "string") tags = [tags];
    // console.log(tags);
    ctx.body = await ctx.db
      .collection("posts")
      .find({})
      .toArray();
  })
  .post("/edit/:id", postBodyChecker, async ctx => {
    await ctx.db
      .collection("posts")
      .findOneAndReplace(toPostQuery(ctx.params.id), ctx.request.body, {
        upsert: false,
        returnOriginal: false
      });
    ctx.body = ctx.params.id;
  })
  .post("/create", postBodyChecker, async ctx => {
    await ctx.db.collection("posts").insertOne(ctx.request.body, { forceServerObjectId: true });
    return (ctx.body = ctx.request.body.url);
  })
  .get("/:id", async ctx => {
    ctx.body = await ctx.db.collection("posts").findOne(toPostQuery(ctx.params.id));
  })
  .use(ctx => {
    console.log("here2");
    if (!ctx.body) ctx.noContent();
  });

export default router;
