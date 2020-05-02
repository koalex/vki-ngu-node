const bodyParser = require('koa-bodyparser');

module.exports = bodyParser({ // application/x-www-form-urlencoded и application/json
	formLimit: '56kb',
	jsonLimit: '1mb'
});