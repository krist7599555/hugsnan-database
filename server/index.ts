import * as Koa from "koa";
import { Context, Request, Response } from "koa";
import { Nuxt, Builder } from "nuxt";
import * as mongo from "koa-mongo";
import * as response from "koa-respond";
import * as bodyParser from "koa-bodyparser";
import * as cors from "koa2-cors";

const consola = require("consola");

import api from "./api/index";
console.log(api.stack.map(i => i.path));

const app = new Koa();
app
  .use(cors())
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
  .use(response())
  .use(bodyParser())
  .use(api.routes())
  .use(api.allowedMethods());

import config from "../nuxt.config";
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

start();
