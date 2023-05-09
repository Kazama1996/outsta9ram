const assert = require("chai").assert;
const path = require("path");
const request = require("supertest");
const User = require("../model/userModel");
const authController = require(path.join(
  __dirname,
  "../controller/authController"
));
const app = require("../index.js");

describe("Unit test of authController:", () => {
  describe("Signup Function", (done) => {
    before(async function () {
      console.log("delete User Data base");
      await User.deleteMany();
    });

    it("Signup success if user input correct information without any duplicate field.", (done) => {
      const testProfile = {
        email: "testMocha@gmail.com",
        fullName: "testMocha",
        profileName: "testMocha",
        password: "admin123",
      };

      request(app)
        .post("/api/v1/auth/signup")
        .set("Accept", "application/json")
        .send(testProfile)
        .end(function (err, res) {
          if (err) return done(err);
          assert.equal(res.status, 201);
          assert.equal(res.body.message, "Regist success");
          done();
        });
    });

    it("Signup failed if user user duplicate email.", (done) => {
      const testProfile = {
        email: "testMocha@gmail.com",
        fullName: "Someone",
        profileName: "Someone",
        password: "admin123",
      };
      request(app)
        .post("/api/v1/auth/signup")
        .set("Accept", "application/json")
        .send(testProfile)
        .end(function (err, res) {
          if (err) return done(err);
          assert.equal(res.status, 401);
          assert.equal(
            res.body.message,
            "The email you're trying to add, has been registered as an account already"
          );
          done();
        });
    });
    it("Signup failed if user user duplicate profileName.", (done) => {
      const testProfile = {
        email: "someOne@gmail.com",
        fullName: "testMocha",
        profileName: "testMocha",
        password: "admin123",
      };
      request(app)
        .post("/api/v1/auth/signup")
        .set("Accept", "application/json")
        .send(testProfile)
        .end(function (err, res) {
          if (err) return done(err);
          assert.equal(res.status, 401);
          assert.equal(
            res.body.message,
            "The profileName you're trying to add, has been registered as an account already"
          );
        });
      done();
    });
  });
});
