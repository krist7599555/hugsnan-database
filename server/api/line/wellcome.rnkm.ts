import { FlexContainer } from "@line/bot-sdk";
export default <FlexContainer>{
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
};
