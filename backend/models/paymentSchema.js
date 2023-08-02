const mongoose = require("mongoose")


const payment_Info = new mongoose.Schema({
     public_Key: String,
     private_Key: String
})

module.exports = mongoose.model("payment_Info", payment_Info)