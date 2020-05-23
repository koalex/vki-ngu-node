const LocalStrategy = require('passport-local').Strategy;
const User = require('../../users/models/user');

module.exports = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	session: false
}, function(email, password, done) {
	User.findOne({email}, function(err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, 'Пользователь не найден');
		}
		if (!user.checkPassword(password)) {
			return done(null, false, 'Неверный пароль');
		}
		return done(null, user);
	});
});
