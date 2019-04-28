// import * as request from "supertest";
// import { app, server } from "./index";
// import * as mongodb from "mongodb";

// describe("Test API", () => {
//   beforeAll(function(done) {
//     console.log("before All");
//     server.on("listening", () => {
//       console.log("server is listen");
//       mongodb
//         .connect("mongodb://localhost:27017/test")
//         .then(done)
//         .catch(err => {
//           done();
//           console.log("don");
//           // console.error(err.message);
//         });
//     });
//   });
//   test("API", async () => {
//     const response = await request(app.callback()).get("/api");
//     expect(response.status).toBe(200);
//   });
//   // test("GET Post Router", async () => {
//   //   const response = await request(app).get("/api/post");
//   //   expect(response.status).toBe(200);
//   // });
//   // test("GET All Post", async () => {
//   //   const response = await request(app).get("/api/post/all");
//   //   expect(response.status).toBe(200);
//   // });
// });
