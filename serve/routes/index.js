const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');
const files = fs.readdirSync(__dirname);
files.filter(file => file.endsWith('.js')).forEach(file => {
	const file_name = file.substring(0, file.length - 3);
	const file_entity = require(path.join(__dirname, file));
	if (file_name !== 'index') {
		router.use(`/api/${file_name}`, file_entity.routes(), file_entity.allowedMethods());
	}
});
module.exports = router;