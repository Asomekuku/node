var express = require('express');
var router = express.Router();

var userModel=require('../model/userModel');
var jwt =require('../utils/jwt')


const { use } = require('.');
const { json } = require('express');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//管理系统 注册
router.post('/cms/regist', function(req, res, next) {
  
  let {username,password,password2}=req.body
  //字段不能为空
  //字段不能太简单
  //两个密码必须相同
  //用户名未被使用
  userModel.find({username}).then(arr=>{
    if(arr.length >0){
      //用户已经存在
      res.json({err:1,msg:'用户名重复'})
    }else{
      //可以注册
      let user={
        username,
        password,
        create_time:Date.now()
      }
      userModel.insertMany([user]).then(()=>{
        res.json({err:0,msg:'注册成功'})
      })
    }
  })
  
});

//登录接口 
router.post('/cms/login',function(req,res){
  let {username ,password}=req.body
  userModel.find({username,password}).then(arr=>{
    //登录成功要返回token给前端
    if(arr.length===1){
      let data={
        err:0,
        msg:'登录成功',
        data:{
          token:jwt.createToken({username,password}),
          username
        }
      }
      res.json(data)
    }else{
      res.json({success:false})
    }
  }).catch(()=>{
    
  })
})




router.get('/all', function(req, res, next) {
  //查询数据库
  userModel.find({}).then(arr=>{
    console.log(arr)
    //后端返回的数据
    let data={
      err:0,
      msg:'success',
      data:{
        list:arr
      }
    }
    res.json(data)  //向前端发送json数据
  })
  // res.send('respond with a resource');
});





module.exports = router;
