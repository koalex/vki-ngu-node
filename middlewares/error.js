module.exports = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		// err.name === 'ValidationError'
		ctx.log.error(err);

		if (__DEV__) console.error(err);
		if (ctx.status > 500) {
			ctx.status = 500;
			return ctx.body = 'Ошибка сервера';
		}

		if (err.name === 'CastError' || 'ValidationError' === err.name) {
			ctx.status = 400;
		}

		if (err.errors) {
			const errMessage = [];
			for (const field in err.errors) {
				errMessage.push({
					field,
					message: err.errors[field].message,
				});
			}
			ctx.body = errMessage;
		} else {
			ctx.body = err.message;
		}
	}
};
