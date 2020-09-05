var express = require('express');
var router = express.Router();

var goodModel =require('../model/goodsModel');

//新增，修改
router.post('/addshop', function(req, res, next) {
    let {id,cate ,img,name,desc,hot,rank,price} =req.body
    // if(!name) return res.json({err:1,msg:'name必要'})
    if(id){
        // 修改
        let ele={
            cate,
            img,
            name,
            desc,
            hot,
            rank,
            price
        }
            goodModel.updateOne({_id:id},{$set:ele}).then(arr=>{
                res.json({err:0,msg:'修改成功'})
        })
    }else{
        //新增
        goodModel.insertMany([{cate ,img,name,desc,hot,rank,price,create_time:Date.now()}]).then(()=>{
            res.json({err:0,msg:'添加成功'})
        })
    }
   

});
//按品类查询
router.get('/lonkingCate',function(req,res){
    let {page,size,cate} =req.query   //get使用query
    page = parseInt(page ? page : 1)
    size = parseInt(size ? size : 2)
    let q = {
        cate:cate ? cate : ''
    }
    if(!q.cate) delete q.cate
    goodModel.find(q).then(arr=>{
        let total =arr.length
        goodModel.find(q).skip((page-1)*size).limit(size).sort({rank:-1}).then(arr=>{
        
            res.json({err:0,msg:'success',data:{list:arr,total}})
        })
       
    })
})
//获取商品详情
router.get('/detail',function(req,res){
    let {id} =req.query
    goodModel.find({_id:id}).then(arr=>{
        res.json({err:0,msg:'success',data:arr[0]})
    })
})
//删除
router.get('/del',function(req,res){
    let {id} =req.query
    goodModel.deleteOne({_id:id}).then(arr=>{
        res.json({err:0,msg:'删除成功',data:arr})
    })
})

module.exports = router;