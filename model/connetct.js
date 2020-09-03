//数据库的连接与操作
const mongoose = require('mongoose')
//连接
mongoose.connect('mongodb://localhost/qf2004', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
});

//监听数据库连接状态
const db =mongoose.connection
db.on('open',function(){
    console.log('成功')
})
db.on('error',function(){
    console.log('失败')
})