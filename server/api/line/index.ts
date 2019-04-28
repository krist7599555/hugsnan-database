import * as Router from "koa-router";
import * as _ from "lodash";
import axios from "axios";
import { Db } from "mongodb";

import wellcomeMsg from "./wellcome.rnkm";

// import config from "../../../nuxt.config";
// const mongo = require("koa-mongo");
import { ObjectId } from "koa-mongo";
import * as line from "@line/bot-sdk";

const LINE_config = {
  channelAccessToken:
    "Z/7ZC4Ml/B/VYRrxRRvHdMvU0trwgWTr1GsUoGmY2TB28+WGriOySaod/59pLTUIgifrULLJnlitqxaWkpc2qnuODTIjkw/VrVSdXAGqfCJXzQLV6y4qKs/ZME22udHHyMvBCDnVbP8Eq99ct1BmrgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "508448013b1733710b71d216e21f31fd"
};
// const Posts = mongo.db(config.mon);
const client = new line.Client(LINE_config);
const router = new Router<any, { db: Db }>();

router
  .prefix("/line")
  .get("/", ctx => {
    ctx.body = "OK";
  })
  .get("/webhook", async ctx => {
    ctx.body = "OK";
  })
  .post("/webhook", async ctx => {
    console.log(ctx.request.body);
    const { events, destination } = ctx.request.body;
    for await (const e of events) {
      console.log(e);
      console.log(e.replyToken);
      if (e.type == "follow") {
        // @ts-ignore
        await client
          .replyMessage(
            e.replyToken,
            // {
            //   type: "text",
            //   text: "wellcomtou"
            // }
            {
              type: "flex",
              altText: "dsf",
              contents: {
                type: "bubble",
                hero: {
                  type: "image",
                  url: "https://rnkm.krist7599555.ml/static/thumbnail.png",
                  size: "full",
                  aspectRatio: "20:13",
                  aspectMode: "cover"
                },
                body: {
                  type: "box",
                  layout: "vertical",
                  spacing: "lg",
                  contents: [
                    {
                      type: "text",
                      text: "รับสมัครทีมงานฝ่าย IT",
                      size: "xl",
                      weight: "bold"
                    },
                    {
                      type: "text",
                      text: "รับน้องก้าวใหม่",
                      size: "md",
                      weight: "bold"
                    },
                    {
                      type: "box",
                      layout: "vertical",
                      spacing: "sm",
                      contents: [
                        {
                          type: "box",
                          layout: "baseline",
                          contents: [
                            {
                              type: "icon",
                              url: "https://www.iconspedia.com/dload.php?up_id=242937"
                            },
                            {
                              type: "text",
                              text: "Frontend",
                              weight: "bold",
                              margin: "sm",
                              flex: 0
                            },
                            {
                              type: "text",
                              text: "ทำหน้าเว็ปสวยๆ",
                              size: "sm",
                              align: "end",
                              color: "#aaaaaa"
                            }
                          ]
                        },
                        {
                          type: "box",
                          layout: "baseline",
                          contents: [
                            {
                              type: "icon",
                              url: "https://www.iconspedia.com/dload.php?up_id=242937"
                            },
                            {
                              type: "text",
                              text: "Backend",
                              weight: "bold",
                              margin: "sm",
                              flex: 0
                            },
                            {
                              type: "text",
                              text: "ทำระบบหลังบ้าน",
                              size: "sm",
                              align: "end",
                              color: "#aaaaaa"
                            }
                          ]
                        },
                        {
                          type: "box",
                          layout: "baseline",
                          contents: [
                            {
                              type: "icon",
                              url: "https://www.iconspedia.com/dload.php?up_id=242937"
                            },
                            {
                              type: "text",
                              text: "Designer",
                              weight: "bold",
                              margin: "sm",
                              flex: 0
                            },
                            {
                              type: "text",
                              text: "ออกแบบสีและ layout",
                              size: "sm",
                              align: "end",
                              color: "#aaaaaa"
                            }
                          ]
                        },
                        {
                          type: "box",
                          layout: "baseline",
                          contents: [
                            {
                              type: "icon",
                              url: "https://www.iconspedia.com/dload.php?up_id=242937"
                            },
                            {
                              type: "text",
                              text: "Communication",
                              weight: "bold",
                              margin: "sm",
                              flex: 0
                            },
                            {
                              type: "text",
                              text: "ติดต่อกับฝ่ายอื่นๆ",
                              size: "sm",
                              align: "end",
                              color: "#aaaaaa"
                            }
                          ]
                        },
                        {
                          type: "box",
                          layout: "baseline",
                          contents: [
                            {
                              type: "icon",
                              url: "https://www.iconspedia.com/dload.php?up_id=242937"
                            },
                            {
                              type: "text",
                              text: "Utility Man",
                              weight: "bold",
                              margin: "sm",
                              flex: 0
                            },
                            {
                              type: "text",
                              text: "เป็นทุกอย่าง",
                              size: "sm",
                              align: "end",
                              color: "#aaaaaa"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      type: "text",
                      text: "มาฝึกสกิลกันได้นะครับ มีพี่ๆน่ารักๆคอยดูแลอยู่",
                      wrap: true,
                      color: "#aaaaaa",
                      size: "xxs"
                    }
                  ]
                },
                footer: {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "spacer",
                      size: "xxl"
                    },
                    {
                      type: "button",
                      style: "primary",
                      color: "#905c44",
                      action: {
                        type: "uri",
                        label: "ดูเว็ปปีก่อน",
                        uri: "https://rnkm.krist7599555.ml"
                      }
                    },
                    {
                      type: "separator"
                    },
                    {
                      type: "separator"
                    },
                    {
                      type: "button",
                      style: "primary",
                      color: "#905c44",
                      action: {
                        type: "uri",
                        label: "เข้าสู่กลุ่ม LINE",
                        uri: "https://line.me/R/ti/g/8CG5UzFcPV"
                      }
                    }
                  ]
                }
              }
            }
            //   {
            //   type: "flex",
            //   altText: "please open in mobile",
            //   contents: wellcomeMsg
            // }
          )
          .catch(console.error);
      } else {
        await client
          .replyMessage(e.replyToken, {
            type: "text",
            text: "Hello from RNKM BOT"
          })
          .catch(console.error);
      }
    }
    ctx.body = ctx.request.body;
  });

export default router;
