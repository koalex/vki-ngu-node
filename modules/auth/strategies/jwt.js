const config = require('config');
const BlackList = require('../models/blackTokens');
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../../users/models/user');


const opts = {
	passReqToCallback: true,
	secretOrKey: config.secret,
	ignoreExpiration: false,
	jwtFromRequest: req => {
		return req.headers['x-access-token'] || req.query.access_token || req.cookies.get('x-access-token') || req.body && req.body.access_token;
	}
};

module.exports = new JwtStrategy(opts, async function(req, jwtPayload, done) {
	const token = req.headers['x-access-token'] || req.query.access_token || req.cookies.get('x-access-token') || req.body && req.body.access_token;
	const denied = await BlackList.findOne({token}).lean().exec();
	const userId = jwtPayload._id;

	if (denied) {
		return done(null, false, {message: 'Токен в чёрном списке', /*type*/});
	}

	// VERIFY

	const user = await User.findOne({_id: userId});

	if (!user) {
		return done(null, false, {message: 'Пользователь не найден', /*type*/});
	}

	if (!user.active) {
		return done(null, false, {message: 'Пользователь не активирован', /*type*/});
	}

	return done(null, user);
});
