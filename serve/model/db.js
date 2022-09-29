// 连接数据库
const mongoose = require('mongoose');
const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../../ini.json"), "utf8")).dataBase;
const username = data.username;
const password = data.password;

const url = 'mongodb://' + username +':' +password +'@120.46.212.64:27017/OrangeOA';

//连接数据库

mongoose.connect(url, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("数据库连接成功!");

});

module.exports = mongoose;
