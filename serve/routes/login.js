const router = require("koa-router")();
const { usersModel } = require("../schema/users");
const { newToken } = require("../tools/token")
const md5 = require('md5-node');

router.post('/', async (ctx) => {

    const req = ctx.request;
    const formLogin = req.body.formLogin;
    const account = formLogin.account;
    const password = formLogin.password;
    const loginStr = md5(account + password);

    let status = "fail"
    let auth = ""
    let token = ""

    try {

        // 获取权限
        const loginCheck = await usersModel.find({ loginStr });

        if (loginCheck.length === 1) {

            status = "success"
            auth = loginCheck[0]['auth'];

            // 获取新token
            token = newToken(account, auth);

        } else {
            status = "fail";
        }

        // 返回结果
        const result = { status, auth, token, account: formLogin.account };

        ctx.body = result;

    } catch (error) {
        console.log(error);
        ctx.body = { status: "fail" };
    }


})


module.exports = router;