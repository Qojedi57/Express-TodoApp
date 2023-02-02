import request from "supertest";
import createServer from "./server.js";

const server = await createServer();

describe("Just testing the server", function () {
  describe("Testing the /todo route", function () {
    it("Should be unable to get todos without flag", function (done) {
      request(server)
        .get("/todo")
        .expect(401)
        .end(function (err) {
          if (err) {
            throw err;
          } else {
            done();
          }
        });
    });
    it("Should be able to create a new todo", function (done) {
      request(server)
        .post("/todo?admin=true").send({
            todo:"Clean the garage"
        }).set('Accept', 'application/json').expect(200).end(function(err,response){
        if (err) {
            throw err;
          } else {
            console.log(response);
            expect(response.body).toEqual({ success:true});
            done();
          }
        });
    });
  });
});
