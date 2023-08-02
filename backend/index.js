const express = require("express")
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors())
var colors = require('colors');
const dotenv = require("dotenv");
const multer = require('multer');
const path = require('path');
// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());


//db conected
require("./db/db")
// Load env file
dotenv.config({path: './config.env'})

// Router File
let Users = require('./routes/Users')
let Payment = require('./routes/Payment')
let Product  = require('./routes/Product')
let Stripe = require('./routes/Stripe')


app.use("/api/v1/user", Users)
app.use("/api/v1/payment", Payment)
app.use('/api/v1/product', Product)
app.use('/api/v1/stripe', Stripe)

app.use('/image', express.static(path.join(__dirname, '/image')));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}` .yellow);
});
