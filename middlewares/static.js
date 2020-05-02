const config = require('config');
const serve = require('koa-static');

module.exports = serve(config.staticRoot, {
	index: 'index.html',
	maxage: __PROD__ ? 8600000 : 0,
	gzip: true,
});