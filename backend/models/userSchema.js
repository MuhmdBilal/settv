const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');

const Users = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [20, "name can not be more then 20 characters"]
    },
    email: {
        type: String,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please add vaild Email address"]
    },
    password: String
})

// encrypting password before saving
Users.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
 });

// verify password
Users.methods.comparePassword = async function(yourPassword){
    return await bcrypt.compare(yourPassword, this.password);
}

module.exports = mongoose.model("users", Users)