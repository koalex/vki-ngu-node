module.exports = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.log.error(err);
		if (__DEV__) console.error(err);
		if (ctx.status > 500) {
			ctx.status = 500;
			return ctx.body = 'Ошибка сервера';
		}
		ctx.body = err.message;
	}
};