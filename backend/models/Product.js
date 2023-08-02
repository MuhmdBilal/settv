const mongoose = require('mongoose')

const Products = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    description: String

})

module.exports = mongoose.model("products", Products)