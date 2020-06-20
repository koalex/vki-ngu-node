const jwt = require('jsonwebtoken');
const config = require('config');
const User  = require('../../users/models/user');
const BlackToken = require('../models/blackTokens');

function createTokens(user/*, opts*/) {
	const accessTokenExpiresIn = 60 * 0.2;//30; // 30min
	const refreshTokenExpiresIn = 86400 * 60; // 60 days

	const access_token = jwt.sign({_id: user._id}, config.secret, {
		algorithm: 'HS512',
		expiresIn: accessTokenExpiresIn
	});

	const refresh_token = jwt.sign({_id: user._id}, config.secret, {
		algorithm: 'HS512',
		expiresIn: refreshTokenExpiresIn
	});

	return {
		access_token,
		refresh_token,
		access_token_expires: Date.now() + accessTokenExpiresIn * 1000,
		refresh_token_expires: Date.now() + refreshTokenExpiresIn * 1000,
	}
}

function setTokensCookies(ctx, tokens) {
	const cookiesOpts = {
		signed: true,
		secure: false,
		httpOnly: true,
	};

	ctx.cookies.set('x-access-token', tokens.access_token, {
		...cookiesOpts,
		expires: new Date(tokens.access_token_expires)
	});

	ctx.cookies.set('x-refresh-token', tokens.refresh_token, {
		...cookiesOpts,
		expires: new Date(tokens.refresh_token_expires)
	});
}

async function refreshTokens(ctx) {
	// const accessToken = ctx.headers['x-access-token'] || ctx.query.access_token || ctx.cookies.get('x-access-token') || ctx.request.body && ctx.request.body.access_token;
	const refreshToken = ctx.headers['x-refresh-token'] || ctx.query.refresh_token || ctx.cookies.get('x-refresh-token') || ctx.request.body && ctx.request.body.refresh_token;

	if (!refreshToken/* || !accessToken*/) {
		return ctx.throw(401, 'Отсутствует токен');
	}
	// VERIFY....

	const decoded = jwt.decode(refreshToken);

	const userId = decoded._id;

	const user = await User.findOne({_id: userId}).lean().exec();
	if (!user) {
		return ctx.throw(500, 'Невалидный токен');
	}

	await Promise.all([/*accessToken,*/ refreshToken].map(token => {
		const verifyOpts = {
			algorithms: ['HS512'],
			ignoreExpiration: true,
		};
		const expires = jwt.verify(token, config.secret, verifyOpts).exp;
		const blackToken = new BlackToken({
			token,
			expires: expires * 1000
		});

		return blackToken.save();
	}));
	const tokens = createTokens(user);
	setTokensCookies(ctx, tokens);

	ctx.body = tokens;
}

function clearTokensCookies (ctx) {
	ctx.cookies.set('x-access-token', null);
	ctx.cookies.set('x-refresh-token', null);
	ctx.cookies.set('x-access-token.sig', null);
	ctx.cookies.set('x-refresh-token.sig', null);
}

exports.refreshTokens = refreshTokens;
exports.createTokens = createTokens;
exports.setTokensCookies = setTokensCookies;
exports.clearTokensCookies = clearTokensCookies;
