

const mongoose =require('mongoose')

module.exports = mongoose.model('goods',mongoose.Schema({
    cate:String,
    img:String,
    create_time:Number,
    name:String,
    desc:String,
    hot:Boolean,
    rank:Number,
    price:Number
}))
