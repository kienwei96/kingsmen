const express = require('express');
const session = require("express-session");
// const apiController= require('./controller/apiController')
const viewController= require('./controllers/viewController')
const userController = require('./controllers/userController')
const sessionController= require('./controllers/sessionController')
const methodOverride = require('method-override')

const app = express();
app.use(express.json())
// app.use('/api', apiController);
app.use(viewController)
app.use(express.urlencoded({extended:false}))
app.use('/public', express.static('public'));
app.use(methodOverride("_method"));

app.use(
    session({
      secret: process.env.SECRET,
      saveUninitialized: false,
      resave: false
    })
  );

app.use('/sessions', sessionController);

//check if there is valid session
app.use((req, res,next)=>{
    console.log(req.session)
    if(req.session.user){
      next()
    }else{
      res.redirect('/sessions/login')
    }
})
  




// CONTROLLERS
// fitting room three
const roomController = require('./controllers/room');
app.use('/room', roomController);

app.use('/users', userController);

module.exports=app