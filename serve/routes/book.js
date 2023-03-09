const router = require("koa-router")();
const { bookModel } = require("../schema/books")

router.get("/getAllBook", async (ctx) => {
  ctx.body = await bookModel.find()
})

router.post("/importBook", async (ctx) => {
  
  const req = ctx.request;

  try {

    const { bookId, bookName, importTime } = req.body.data;

    const hasBook = await bookModel.find({bookId});

    if (hasBook.length > 0) {
      ctx.body = "hasBook";
    } else {
      await bookModel.create({ bookId, bookName, importTime, status: "可借" });
      ctx.body = "success";
    }

    
  } catch (error) {
    
  }


})

router.post("/borrowBook", async (ctx) => {

})

module.exports = router;