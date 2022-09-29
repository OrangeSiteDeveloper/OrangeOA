const router = require("koa-router")();
const { sendMail } = require('../tools/email');
const { joinModel } = require("../schema/join")

router.post('/sendMail', async (ctx, next) => {
    const req = ctx.request;

    try {
 
        const secret = req.body.secret;
        // const from = req.body.from;
        const from = "1830975557@qq.com";
        // const to = req.body.to;
        // const to = "849348480@qq.com";
        // const subject = req.body.subject;
        const subject = "橙果工作室2022年面试通知";
        const text = req.body.text;

        const joinData = await joinModel.find();
        joinModel.updateMany({}, { emailed: true })


        for (let i = 0; i < joinData.length/2; i++) {
            console.log(i);
            // sendMail(from, joinData[i]["sEmail"], subject);
        }
        // const info = await sendMail(from, "849348480@qq.com", subject);
        // console.log(info);

        // console.log(to);
        for (let i = Math.ceil(joinData.length/2); i < joinData.length; i++) {
            // console.log(i);
            sendMail(from, joinData[i]["sEmail"], subject);
        }

    } catch (error) {
        console.log(error);
        ctx.body = "error"
    }

})

module.exports = router;