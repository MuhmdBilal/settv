const express = require("express");
const router = express.Router();
const {CreatePayment, getPayment, deletPayment} = require('../controllers/PaymentInfo')


router.route("/").post(CreatePayment).get(getPayment);
router.route("/Delete_Payment").delete(deletPayment)

module.exports = router;