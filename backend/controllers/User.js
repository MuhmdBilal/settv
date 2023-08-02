const Users = require("../models/userSchema")


exports.CreateUser = async (req, res) => {
  try {
    const user = await Users.create(req.body)
    res.status(200).json({ success: true, result: user });
  } catch (err) {
    console.log("err", err);
  }
}

exports.createLogin = async (req, res) => {
  try {
    let { loginEmail, loginPassowrd } = req.body;
    if (!loginEmail || !loginPassowrd) {
      return res.send({ result: "E-mail and password are required" })
    }
    let checklogin = await Users.findOne({ email: loginEmail })
    if (!checklogin) {
      return res.send({ result: "Invalid credentials Email" })
    }
    const isMatched = await checklogin.comparePassword(loginPassowrd);
        if (!isMatched) {

            return res.send({ result: "Invalid credentials password" })
        }
        res.send({ result: "Login Successfully", status: checklogin })


  } catch (e) {
    console.log("e", e);
  }
}