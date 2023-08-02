const express = require("express");
const router = express.Router();
const {createStripe,createStripe_info, getStripe_Info} = require('../controllers/stripeControllers')



router.route('/create-checkout-session').post(createStripe)
router.route('/Stripe_Info').post(createStripe_info).get(getStripe_Info)

module.exports = router;