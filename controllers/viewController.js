const express=require('express')
const router=express.Router()












// ----------------API----------------------






// -----------------Page----------------------


// GET INDEX
router.get('/', (req, res) => {
    res.render('index.ejs', {});
  });

module.exports=router