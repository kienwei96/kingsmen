const express=require('express')
const router=express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
// const checkIsAdmin = require('../middlewares/checkIsAdmin')
// [checkIsAdmin] to be insert in routes below later

router.get('/new',(req,res)=>{
  res.render('users/new.ejs')
})

router.post('/',async (req,res)=>{
  const username =  req.body.username
  const password =  await bcrypt.hash(req.body.password,10);
  await User.create({
    username,
    password,
    role: "BASIC"
  })
  res.redirect('/home')
})


module.exports=router;