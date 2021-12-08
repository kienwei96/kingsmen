const express=require('express')
const router=express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


router.get('/login',(req,res)=>{
  res.render('session/login.ejs')
})

router.post('/',async (req,res)=>{
  console.log(req.session);
  const user = await User.findOne({username: req.body.username});
  console.log(user);
  const isValid = await bcrypt.compare(req.body.password,user.password);
  if(isValid){
    req.session.user=user 
    res.redirect('/')

  }else{
    res.redirect('/sessions/login')
  }
})

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});


module.exports=router;