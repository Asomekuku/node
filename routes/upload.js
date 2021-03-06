var express = require('express');
var router = express.Router();

var multiparty =require('multiparty');
var path=require('path')
var fs=require('fs')
router.post('/img', function(req, res, next) {
    //创建一个实列
    var form = new multiparty.Form();
    //from.parse把req中的图片数据转存到服务器临时存储路径中去
    form.parse(req, function(err, fields, files) {
        if(err){
            res.json({err:1,msg:'图片上传失败'})
        }else{
            //图片成功
            console.log('files',files)
            const file = files.file[0]
            //使用fs模块把零时路径中的图片数据，写入到服务器硬盘中
            let readStream=fs.createReadStream(file.path)
            let now =Date.now()
            let p=path.join(__dirname,'../public/images/'+now+'-'+ file.originalFilename)
            let writeStream=fs.createWriteStream(p)

            readStream.pipe(writeStream)

            writeStream.on('close',function(){
                let data={
                    url:`/images/${now}-${file.originalFilename}`
                }
                res.json({err:0,msg:'图片上传成功',data})
            })
        }
      });

});




module.exports = router;


// cnpm i multiparty -S 安装