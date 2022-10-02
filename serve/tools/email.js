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
        很遗憾同学，本次面试你没有通过。
        <br />
        但是请不要气馁，你的大学生活会依旧精彩。
        <br />
        山水有相逢，期待我们的二次纳新，咱们后会有期。
        <br />
        <br />
        橙果工作室
        `
        // 获取账号、授权码
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../../ini.json"), "utf8")).email;

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
