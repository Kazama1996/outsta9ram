const assert = require("chai").assert;
const path = require("path");
const request = require("supertest");
const User = require("../model/userModel");
const authController = require(path.join(
  __dirname,
  "../controller/authController"
));
const app = require("../index.js");
const { useAsyncValue } = require("react-router-dom");
const { triggerAsyncId } = require("async_hooks");

describe("Unit test of authController:", () => {
  before(async function () {
    console.log("delete User Data base");
    await User.deleteMany();
  });
  after(async function () {
    await User.deleteMany();
  });
  describe("Signup Function", (done) => {
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
  describe("Login Function", (done) => {
    before(async function () {
      await User.deleteMany();

      const testProfile = {
        email: "testMocha@gmail.com",
        fullName: "testMocha",
        profileName: "testMocha",
        password: "admin123",
      };
      await User.create(testProfile);
    });
    it("Login success if user give a correct email and password", (done) => {
      const loginProfile = {
        email: "testMocha@gmail.com",
        password: "admin123",
      };
      request(app)
        .post("/api/v1/auth/login")
        .set("Accept", "application/json")
        .send(loginProfile)
        .end(function (err, res) {
          if (err) done(err);
          assert.equal(res.status, 200);
          assert.equal(res.body.message, "Login success");
          done();
        });
    });
    it("Login fail if user give incorrect email or password", (done) => {
      const loginProfile = {
        email: "wrong@gmail.com",
        password: "admin123",
      };
      request(app)
        .post("/api/v1/auth/login")
        .set("Accept", "application/json")
        .send(loginProfile)
        .end(function (err, res) {
          if (err) done(err);
          assert.equal(res.status, 401);
          assert.equal(res.body.message, "Invalid email or password");
          done();
        });
    });
    it("Login fail if user login without email or password ", (done) => {
      const loginProfile = {
        email: "",
        password: "admin123",
      };
      request(app)
        .post("/api/v1/auth/login")
        .set("Accept", "application/json")
        .send(loginProfile)
        .end(function (err, res) {
          if (err) done();
          assert.equal(res.status, 400);
          assert.equal(res.body.message, "Invalid email or password");
          done();
        });
    });
  });
});
