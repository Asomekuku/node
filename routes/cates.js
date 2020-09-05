var express = require('express');
var router = express.Router();

var cateModel =require('../model/cateModel')
/* GET home page. 添加品类*/
router.post('/add', function(req, res, next) {
    let {cate ,cate_zh} =req.body
    cateModel.insertMany([{cate,cate_zh,create_time:Date.now()}]).then(()=>{
        res.json({err:0,msg:'success'})
    })

});

//查询
router.post('/query',function(req,res){
    let {cate}=req.body
    cateModel.find({cate}).then(arr=>{
        if(arr.length>0){
            res.json({err:0,msg:'success',data:{data:arr}})
        }else{
            res.json({err:1,msg:'error'})
        }
    })
})


router.get('/all',function(req,res){
    cateModel.find({}).then(arr=>{
        res.json({err:0,msg:'success',data:{list:arr}})
    })
})



module.exports = router;
