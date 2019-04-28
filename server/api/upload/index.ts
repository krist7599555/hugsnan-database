import * as Router from "koa-router";
import * as _ from "lodash";
import { nextTick } from "q";
const serve = require("koa-static");
const mount = require("koa-mount");
const multer = require("koa-multer");
import config from "../../../nuxt.config.keep";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, config.storagePath);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "." + file.originalname);
    // var fileFormat = file.originalname.split(".");
    // cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});

const upload = multer({ storage: storage });
const router = new Router();

router
  .prefix("/upload")
  .get("/", ctx => ctx.ok("POST methods to /upload formDat file"))
  .post("/", upload.single("file"), ctx => {
    // @ts-ignore
    const filename = ctx.req.file.filename;
    ctx.body = "/storage/" + filename;
  });

export default router;
