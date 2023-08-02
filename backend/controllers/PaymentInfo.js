const payment_Info = require("../models/paymentSchema")

exports.CreatePayment = async (req, res) => {
    try {
        const payment = await payment_Info.create(req.body)
        res.status(200).json({ success: true, result: payment });
    } catch (e) {
        console.log("e", e);
    }
}
exports.getPayment = async(req,res) =>{
    try{
      const payment = await payment_Info.find()
      res.status(200).json({ success: true, result: payment });
    }catch(e){
        console.log("e", e);
    }
}

exports.deletPayment = async(req,res)=>{
    try{
   let payemntDelete =  await payment_Info.deleteMany({})
   res.status(200).json({ success: true, result: payemntDelete });
    }catch(e){
        console.log("e", e);
    }
}