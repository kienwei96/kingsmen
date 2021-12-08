const express=require('express')
const router=express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const session = require("express-session");
const sessionController= require('./sessionController')
// const checkIsAdmin = require('../middlewares/checkIsAdmin')
// [checkIsAdmin] to be insert in routes below later


router.get('/',(req,res)=>{
  res.render('users/new.ejs')
})

router.post('/',async (req,res)=>{
  console.log("body is", req.body)
  const username =  req.body.username
  const password =  await bcrypt.hash(req.body.password,10);
  await User.create({
    username,
    password,
  })
  res.redirect('/')
})


module.exports=router;