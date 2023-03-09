const router = require("koa-router")();
const { joinUs, joinStatus, getAllStu, changeStatus, pass, fail } = require("../tools/join")

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

        ctx.body = relt.status;
        
    } catch (error) {
        console.log(error);
    }

})

router.post("/getAllStu", async (ctx, next) => {
    const req = ctx.request;

    try {

        ctx.body = await getAllStu();
        
    } catch (error) {
        console.log(error);
    }

})

router.post("/changeStatus", async (ctx, next) => {
    const req = ctx.request;

    try {

        ctx.body = await changeStatus();
        
    } catch (error) {
        console.log(error);
    }

})

router.post("/pass", async (ctx, next) => {
    const req = ctx.request;

    try {

        const sId = req.body.data.sId;

        ctx.body = await pass(sId);
        
        
    } catch (error) {
        console.log(error);
    }

})

router.post("/fail", async (ctx, next) => {
    const req = ctx.request;

    try {

        const sId = req.body.data.sId;

        ctx.body = await fail(sId);
        
        
    } catch (error) {
        console.log(error);
    }

})
module.exports = router;