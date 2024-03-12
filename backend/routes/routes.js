const express = require('express');
const router = express.Router();

const {getUserByName, getUser, sayHello} = require('../controller/user')

router.param("username",getUserByName);
router.get("/getUserByName/:username",getUser);
router.get("/hello",sayHello);

module.exports = router;