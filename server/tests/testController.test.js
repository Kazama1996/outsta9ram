const Cube = require("../controller/testController");
const testController = require("../controller/testController");
const should = require("chai").should();
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../index.js");
describe("unit test of testController", function () {
  it("test Request testFn", (done) => {
    request(app)
      .get("/api/vi/testFn")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.name).to.be.equal("John");
      });
    done();
  });
});
