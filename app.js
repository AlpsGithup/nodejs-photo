var express=require('express');
var app=express();
var router=require("./router");
//she zhi public wenjianjia wei jing tai ziyuan wenjianjia
app.use(express.static('public'));
app.use(express.static('upload'));
//she zhi moban yinqing
app.set('view engine','ejs')
// app.get('/',(req,res)=>{
//     // res.send("success");
//     //xuanran
//     res.render('index');
// });
//lu you mokuai hua
//chu li qing qiu
app.get("/",router.index);
app.get("/upload",router.upload);
app.get("/show",router.show);
app.get("/add",router.add);
app.get("/delete",router.delete);
//404 pi pei ren yi luyou
// app.use((req,res)=>{
//     res.send('err');
// })
app.post("/uploadPicture",router.uploadPicture);
app.get("/getPicture",router.getPicture);
app.get("/addFiles",router.addFiles);
app.get("/delFiles",router.delFiles);
app.use(router.err);
app.listen(3000);