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
import config from "../nuxt.config";

const app = new Koa();
app
  .use(cors())
  // .use(logger())
  .use(
    mongo({
      host: "localhost",
      port: 27017,
      db: "test",
      authSource: "admin",
      max: 100,
      min: 1,
      acquireTimeoutMillis: 100
    })
  )
  .use(mount("/storage", ctx => send(ctx, ctx.path, { root: config.storagePath })))
  .use(response())
  .use(bodyParser())
  .use(api.routes())
  .use(api.allowedMethods());

async function start() {
  const nuxt = new Nuxt(config);
  const {
    host = process.env.HOST || "127.0.0.1",
    port = process.env.PORT || 3000
  } = nuxt.options.server;

  if (!process.env.SKIP_NUXT) {
    if (config.dev) {
      const builder = new Builder(nuxt);
      await builder.build();
    } else {
      await nuxt.ready();
    }
    app.use(ctx => {
      ctx.status = 200;
      ctx.respond = false; // Bypass Koa's built-in response handling
      nuxt.render(ctx.req, ctx.res);
    });
  }

  app.listen(+port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

console.log(api.stack.map(i => i.path));
start();
