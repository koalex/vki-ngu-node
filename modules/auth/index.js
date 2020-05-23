const routers = require('./routes');
const passport = require('./middlewares/passport');

module.exports = app => {
	app.use(passport.initialize());
	routers.forEach(router => {
		app.use(router.routes());
	});
};
