// 连接数据库
const mongoose = require('mongoose');
<<<<<<< HEAD
const username = "OrangeOA"
const password = "GTxj3FASZaFSJtWa"
=======
const username = ""
const password = ""
>>>>>>> 08b17b502de873a56a340173c38a2ba9c1c70117
const url = 'mongodb://' + username +':' +password +'@120.46.212.64:27017/OrangeOA'

//连接数据库

mongoose.connect(url, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("数据库连接成功!");

});

module.exports = mongoose;
