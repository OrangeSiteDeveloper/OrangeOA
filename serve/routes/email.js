const router = require("koa-router")();
const { sendMail } = require('../tools/email');
const { joinModel } = require("../schema/join")

router.post('/sendMail', async (ctx, next) => {
    const req = ctx.request;

    try {
 
        const secret = req.body.secret;
        // const from = req.body.from;
        const from = "2251944982@qq.com";
        // const to = req.body.to;
        const to = "2251944982@qq.com";
        // const subject = req.body.subject;
        const subject = "橙果工作室2022年二面通知";
        const text = req.body.text;

        // const joinData = await joinModel.find({"status" : "2.1"});
        // joinModel.updateMany({}, { emailed: true })
        // const info = sendMail(from, to, subject);
        // console.log(info);

        // console.log(joinData);
        sendMail(from, to, subject);
        // for (let i = 80; i < joinData.lne; i++) {
        //     console.log(joinData[i]["sEmail"]);
        // }

        ctx.body = "";


    } catch (error) {
        console.log(error);
        ctx.body = "error"
    }

})

module.exports = router;