var fs = require('fs');
var formidable = require("formidable");
var path = require("path");
exports.index = function (req, res) {
    res.render('index');
}
exports.upload = function (req, res) {
    //zhun bei shuju
    //du qu mulu
    // var dirList=['aa','bb','cc']
    var dirList = [];
    fs.readdir('./upload', (err, files) => {
        // console.log(files);
        //fs.stat chuli bushi wenjianjia
        //pan duan shifou shi wenjianjia
        //forEach xuhuan bianli
        //value --yao bianli de wenjian
        //index --xiabiao
        files.forEach((value, index) => {
            fs.stat("./upload/" + value, (err, stats) => {
                // console.log(value+"is files or not?"+stats.isDirectory());
                if (stats.isDirectory()) {
                    dirList.push(value);
                }
                //ru guo jie su ,jiu zhijie xuanran
                if (index == files.length - 1) {
                    //  console.log(dirList);
                    res.render('upload', { dirList });
                }
            })
        })
    })

}
exports.show = function (req, res) {
    //zhun bei shuju
    //du qu mulu
    // var dirList=['aa','bb','cc']
    var dirList = [];
    fs.readdir('./upload', (err, files) => {
        // console.log(files);
        //fs.stat chuli bushi wenjianjia
        //pan duan shifou shi wenjianjia
        //forEach xuhuan bianli
        //value --yao bianli de wenjian
        //index --xiabiao
        files.forEach((value, index) => {
            fs.stat("./upload/" + value, (err, stats) => {
                // console.log(value+"is files or not?"+stats.isDirectory());
                if (stats.isDirectory()) {
                    dirList.push(value);
                }
                //ru guo jie su ,jiu zhijie xuanran
                if (index == files.length - 1) {
                    //  console.log(dirList);
                    res.render('show', { dirList });
                }
            })
        })
    })
}
exports.add = function (req, res) {
    res.render('add');
}
exports.delete = function (req, res) {
    //zhun bei shuju
    //du qu mulu
    // var dirList=['aa','bb','cc']
    var dirList = [];
    fs.readdir('./upload', (err, files) => {
        // console.log(files);
        //fs.stat chuli bushi wenjianjia
        //pan duan shifou shi wenjianjia
        //forEach xuhuan bianli
        //value --yao bianli de wenjian
        //index --xiabiao
        files.forEach((value, index) => {
            fs.stat("./upload/" + value, (err, stats) => {
                // console.log(value+"is files or not?"+stats.isDirectory());
                if (stats.isDirectory()) {
                    dirList.push(value);
                }
                //ru guo jie su ,jiu zhijie xuanran
                if (index == files.length - 1) {
                    //  console.log(dirList);
                    res.render('delete', { dirList });
                }
            })
        })
    })
    // res.render('delete');
}

//封装
function myReadDir(renderPath) {
    //zhun bei shuju
    //du qu mulu
    // var dirList=['aa','bb','cc']
    var dirList = [];
    fs.readdir('./upload', (err, files) => {
        // console.log(files);
        //fs.stat chuli bushi wenjianjia
        //pan duan shifou shi wenjianjia
        //forEach xuhuan bianli
        //value --yao bianli de wenjian
        //index --xiabiao
        files.forEach((value, index) => {
            fs.stat("./upload/" + value, (err, stats) => {
                // console.log(value+"is files or not?"+stats.isDirectory());
                if (stats.isDirectory()) {
                    dirList.push(value);
                    //ru guo jie su ,jiu zhijie xuanran
                    if (index == files.length - 1) {
                        //  console.log(dirList);
                        res.render(renderPath, { dirList });
                    }
                }

            })
        })
    })
}


//chuli post tijiao de shuju
exports.uploadPicture = function (req, res) {
    var form = new formidable.IncomingForm();
    //she zhi shang chuan mulu
    form.uploadDir = './upload';
    //fields-- tijiao de wenben shuju
    //files-- tijiao de erjianzhi wenjian
    form.parse(req, (err, fields, files) => {
        // console.log(fields);
        console.log(files);
        if (err) {
            res.send("upload err")
        }
        //she zhi shang chuan mulu
        // console.log(__dirname);
        var oldPath = __dirname + '/' + files.pics.path;
        var time = +new Date();
        var random = parseInt(Math.random() * 10000);
        var extname = path.extname(files.pics.name);
        var newPath = __dirname + '/upload/' + fields.dirname + '/' + time + random + extname;
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                res.send("upErr");
            }
            else {
                res.send('upSucc');
            }
        })
    })
}
exports.getPicture = function (req, res) {
    var showList = [];
    // console.log(req.query.dirname);
    fs.readdir("./upload/" + req.query.dirname, (err, files) => {
        //pan duan wenjianjia shifou wei kong
        // console.log(files.length);
        if (files.length > 0) {
            files.forEach((value, index) => {
                // console.log(value);
                fs.stat('./upload/' + req.query.dirname + '/' + value, (err, stats) => {
                    // console.log(stats);
                    // console.log(value + 'isFile>' + stats.isFile());
                    if (stats.isFile()) {
                        showList.push(value);
                    }
                    if (index == files.length - 1) {
                        // console.log(showList);
                        res.send({
                            'result': showList,
                        })
                    }
                })
            })
        }
        else {
            res.send({
                'result': showList,
            })
        }
    })
}
exports.addFiles = function (req, res) {
    console.log(req.query.fileName);
    fs.mkdir("./upload/" + req.query.fileName, { recursive: true }, (err) => {
        if (err) {
            res.send("<h3>Error</h3><a href='/add'>返回上一级</a><br><a href='/'>返回首页</a>");
        }
        res.send("<h3>Success</h3><a href='/add'>返回上一级</a><br><a href='/'>返回首页</a>");
    })
}

exports.delFiles = function (req, res) {
    // console.log(req.query.dirname);
    fs.readdir('./upload/' + req.query.dirname, (err, files) => {
        // 第一步：将所有的文件删除(清空所有的文件夹) 第二部：删除所有的空文件夹
        // fs.unlink()
        // console.log(files.length);
        if (files.length > 0) {
            files.forEach((file, index) => {
                fs.unlinkSync('./upload/' + req.query.dirname + '/' + file);
            });
        }
        //.rmdir && fs.rmdirSync 进行删除文件夹操作，但文件夹必须为空文件夹
        fs.rmdir("./upload/" + req.query.dirname, (err) => {
            if (err) {
                res.send("<h3>Error</h3><a href='/delete'>返回上一级</a><br><a href='/'>返回首页</a>");
            }
            // res.send("Success");
            res.send("<h3>Success</h3><a href='/delete'>返回上一级</a><br><a href='/'>返回首页</a>");
        })
    })


}
exports.err = function (req, res) {
    res.render('404');
}