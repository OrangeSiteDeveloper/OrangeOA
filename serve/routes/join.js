const router = require("koa-router")();
const { joinUs, joinStatus, getAllStu } = require("../tools/join")

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

router.post("/queryStatus", async (ctx, next) => {
    const req = ctx.request;

    try {

        const sId = req.body.sId._value;
        const relt = await joinStatus(sId);

        ctx.body = relt.steps;
        
    } catch (error) {
        console.log(error);
    }

})

router.post("/getAllStu", async (ctx, next) => {
    const req = ctx.request;

    try {

        const secret = req.body.secret._value;
        if (secret === "") {
            const relt = await getAllStu();
        }

        ctx.body = relt;
        
    } catch (error) {
        console.log(error);
    }

})

module.exports = router;