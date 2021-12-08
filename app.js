const express = require('express');
const session = require("express-session");
// const apiController= require('./controller/apiController')
// const viewController= require('./controllers/viewController')
const userController = require('./controllers/userController')

const methodOverride = require('method-override')
const app = express();

// MIDDLEWARE & body parser
app.use(express.json())
// app.use('/api', apiController);
app.use(express.urlencoded({extended:false}))
app.use('/public', express.static('public'));
app.use(methodOverride("_method"));

require("dotenv").config();


app.use(
    session({
      secret: process.env.SECRET,
      saveUninitialized: false,
      resave: false
    })
  );
  
  
// GET INDEX PAGE
app.get('/', (req, res) => {
    res.render('index.ejs', {session: req.session.user});
  });

// sign up page
app.use('/signup', userController);


const sessionController= require('./controllers/sessionController')
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


module.exports=app