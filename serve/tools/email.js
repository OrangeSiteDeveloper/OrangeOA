const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

/**
 * 发送邮件
 * @param {发件人} form 
 * @param {收件人} to 
 * @param {标题} subject 
 * @param {内容} text 
 */

async function sendMail(from, to, subject) {

    try {
        const html = `
        亲爱的同学, 您好！
        <br />
        感谢您对我们的信任和支持, 很荣幸通知您：您将于2022年9月28日晚20:00~22:30参加我们的第一次面试, 具体地点图书馆一楼C109。
        <br />
        本次面试考察的是“第一印象”, 您将通过自我介绍来向我们展示自己个性和优势。可以说专业知识, 也可以讲讲个性特点、兴趣爱好等等, 内容不限。自我介绍时常推荐为3min/人。
        <br />
        面试时间和地点也会在 2022纳新群中通知, 群号：891818752, 请及时关注。
        <br />
        最后, 希望您积极准备, 我们期待您的精彩表现！
        <br />
        <br />
        祝您面试顺利！
        <br />
        祝顺利~
        <br />
        橙果工作室
        `
        // 获取账号、授权码
        const data = JSON.parse(fs.readSync(path.join(__dirname, "../../ini.json"), "utf8")).email;

        // 创建nodemailer传输器
        let transporter = nodemailer.createTransport({
            host: "smtp.qq.com",
            port: 465,
            secure: true,
            auth: {
                user: data.user, // 发送方账号
                pass: data.pass  // 授权码
            }
        });

        // 定义transport对象并发送邮件
        let info = await transporter.sendMail({ from, to, subject, html });

        return info;

    } catch (error) {

        console.log(error);

    }

}

module.exports = { sendMail };