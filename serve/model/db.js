// 连接数据库
const mongoose = require('mongoose');

// 指定数据库地址
const url = 'mongodb://localhost:27017/OrangeOA'

//连接数据库

mongoose.connect(url, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("数据库连接成功!");

});

module.exports = mongoose;