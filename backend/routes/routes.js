const express = require('express');
const router = express.Router();

const {getUserByName, getUser, registerUser, sayHello, loginUser} = require('../controller/user')

router.param("username",getUserByName);
router.get("/getUserByName/:username",getUser);
router.get("/hello",sayHello);
router.post("/register",registerUser);
router.post("/login",loginUser);

module.exports = router;