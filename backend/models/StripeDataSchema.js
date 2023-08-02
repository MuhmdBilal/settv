const mongoose = require("mongoose")


const stripe_Info = new mongoose.Schema({
    amount: Number,
    transaction_id : String,
    title: String,
    description: String,
    User_Name: String,
    time : String,
    userId : String


})


module.exports = mongoose.model("stripe_Info", stripe_Info)