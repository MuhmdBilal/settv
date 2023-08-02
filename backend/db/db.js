const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path: './config.env'})
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {   
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(()=> console.log(`DB connected`.blue.bold))
.catch((err)=> console.log(err));
