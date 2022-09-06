const router = require("koa-router")();
const { joinModel } = require("../schema/join");
const { joinUs } = require("../tools/join")

router.post("/submitMsg", async (ctx, next) => {
    const req = ctx.request;

    try {
        const data = req.body.data._value;
        const relt = await joinUs(data);

        ctx.body = relt;
        
    } catch (error) {
        console.log(error);
    }

})

module.exports = router;