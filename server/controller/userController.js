const crudController = require("./crudController");
const User = require("../model/userModel");

exports.showProfile = (req, res, next) => {};

exports.getAllUser = crudController.getAll(User);
