const express = require("express");
const router = express.Router();
const {CreateUser, createLogin} = require('../controllers/User')



router.route('/').post(CreateUser)
router.route('/login').post(createLogin)

module.exports = router;