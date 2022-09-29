const router = require("koa-router")();
const { fileRead } = require("../tools/file")

router.get("/navBar", async (ctx, next) => {
    
    ctx.body = [{
        "path": "/joinManager",
        "name": "joinManager",
        "label": "面试管理",
        "icon": "user",
        "auth": "root",
        "isUsed": true,
        "key": "joinManager"
    }]
})

module.exports = router;
