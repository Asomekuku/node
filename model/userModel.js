const mongoose =require('mongoose')

//创建一个schema
const userSchema=mongoose.Schema({
    username:String,
    password:String,
    create_time:Number
})

//增删改查
//方法:.find() .insertMany() .updateOne() .deleteOne() .limit() .skip() .count()
const userModel=mongoose.model('users',userSchema)

module.exports =userModel //抛出去