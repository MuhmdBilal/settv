const express = require("express");
const router = express.Router();
const multer = require('multer');

const {uploadImage, product, getProduct} = require("../controllers/Product")


router.route("/upload").post(uploadImage)

router.route('/').post(product).get(getProduct)


module.exports = router;