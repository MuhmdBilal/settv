const express = require('express');
const dotenv = require("dotenv");
dotenv.config({path: '../config.env'})
const Stripe = require('stripe')(process.env.STRIPE_KEY);
const stripe_Info =require("../models/StripeDataSchema")
// const StripeKey = Stripe(process.env.STRIPE_KEY)



exports.createStripe = async(req,res)=>{
    try{

     let {token, amount} = req.body
    //  console.log(user_id);
     let sttripevalue = await Stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
     })
     res.send(sttripevalue);
    }catch(e){
        console.log("e", e);
    }
}

exports.createStripe_info = async (req,res)=>{
    try{
        let stripeInfo = await stripe_Info.create(req.body)
        res.status(200).json({ success: true, result: stripeInfo });
    }catch(e){
        console.log("e", e);
    }
}


exports.getStripe_Info = async(req,res)=>{
    try{
        const stripeInfo = await stripe_Info.find()
        res.status(200).json(stripeInfo);
    }catch(e){
        console.log("e", e);
    }
}