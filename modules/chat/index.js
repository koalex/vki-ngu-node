const routers = require('./routes');

module.exports = app => {
	routers.forEach(router => {
		app.use(router.routes());
	});
};