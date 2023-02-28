const { PostRegister } = require("../controller/UserController");

const route = require("express").Router();

route.post('/', PostRegister)

module.exports = route