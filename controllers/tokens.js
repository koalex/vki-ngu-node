const jwt = require('jsonwebtoken');
const config = require('config');

function createTokens(user/*, opts*/) {
	const accessTokenExpiresIn = 60 * 30; // 30min
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

exports.createTokens = createTokens;
exports.setTokensCookies = setTokensCookies;