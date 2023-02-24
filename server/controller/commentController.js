const Comment = require("../model/commentModel");
const crudController = require("./crudController");

exports.createComment = crudController.createOne(Comment);
