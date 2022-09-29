const jwt = require("jsonwebtoken");
const secret = "s-HoiH=wfOe.wh8j,P9i34Sa"

/**
* 生成token
* @param {账号} account 
* @param {用户权限} auth 
*/
async function newToken(account, auth) {

  const created = Math.floor(Date.now() / 1000);
  return jwt.sign(
    {
      account, auth
    },
    secret,
    {
      expiresIn: created + 60 * 60 * 12 // 12小时过期
    }
  )

}

// token校验
async function tokenCheck(req) {

  const token = req.cookies.token

  try {

      const data = jwt.verify(token, secret)

      return data.auth;

  } catch (error) {
      console.log(error);
  }

}

module.exports = {
  newToken, tokenCheck
}