const logger = require('../lib/logger');

module.exports = async (ctx, next) => {
	ctx.log = logger.child({
		requestId: Math.random(),
		url: ctx.url,
		level: 'error'
	});
	await next();
}