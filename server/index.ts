import * as Koa from "koa";
import { Context, Request, Response } from "koa";
import { Nuxt, Builder } from "nuxt";
import * as mongo from "koa-mongo";
import * as response from "koa-respond";
import * as bodyParser from "koa-bodyparser";
import * as cors from "koa2-cors";
import * as send from "koa-send";
import * as mount from "koa-mount";
import { resolve } from "path";
const consola = require("consola");
const logger = require("koa-logger");

import api from "./api/index";
import config from "../nuxt.config.keep";

var IS_NUXT_READY = false;

const nuxt = new Nuxt(config);
const {
  host = process.env.HOST || "127.0.0.1",
  port = process.env.PORT || 3000
} = nuxt.options.server;

export const app = new Koa();
app
  .use(cors())
  .use(mount("/storage", ctx => send(ctx, ctx.path, { root: config.storagePath })))
  .use(response())
  .use(bodyParser())
  .use(mongo(config.mongo))
  .use(api.routes())
  .use(api.allowedMethods())
  .use(async ctx => {
    if (!process.env.SKIP_NUXT && !IS_NUXT_READY) {
      if (process.env.NODE_ENV != "production") {
        const builder = new Builder(nuxt);
        await builder.build();
      } else {
        await nuxt.ready();
      }
      IS_NUXT_READY = true;
    }
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    nuxt.render(ctx.req, ctx.res);
  });

export const server = app.listen(+port, host, () =>
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
);
