var express = require('express');
var router = express.Router();

var goodModel =require('../model/goodsModel')

router.post('/addshop', function(req, res, next) {
    let {cate ,img,name,desc,hot,rank,price} =req.body
    goodModel.insertMany([{cate ,img,name,desc,hot,rank,price,create_time:Date.now()}]).then(()=>{
        res.json({err:0,msg:'success'})
    })

});




module.exports = router;