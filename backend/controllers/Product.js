const multer = require("multer");
const Products = require("../models/Product")
var image;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./image/");
  },
  filename: function (req, file, cb) {
    image = file.fieldname + "-" + Date.now() +  ".png"
    cb(null, image);
  },
});

const upload = multer({ storage: storage }).single("image");
exports.uploadImage = (req, res) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      
      return res.status(200).send(req.file);
    });
  };

  exports.product = async(req,res)=>{
    try{
       let {title,price,description } = req.body
       let arry = {title,image,price, description }
       const product = await Products.create(arry)
       res.status(200).json({ success: true, result: product });
    }catch(e){
      console.log("e", e);
    }
  }

  exports.getProduct= async(req,res)=>{
    try{
      const product = await Products.find()
      res.status(200).json(product);
    }catch(e){
      console.log("e", e);
    }
  }

  // module.exports = { uploadImage };