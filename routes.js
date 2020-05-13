const Router = require('koa-router');
const bodyParser = require('./middlewares/bodyParser');
const busboy = require('./middlewares/busboy');
const fs = require('fs');
// const imgMin = require('./middlewares/imageMin');

const publicRouter = new Router();
const apiRouter = new Router({
	prefix: '/api'
});

const users = [];

publicRouter
	.get('/contacts', async ctx => {
		ctx.body = 'СТРАНИЦА КОНТАКТЫ';
	});

apiRouter
	.get('/contacts', async ctx => {
		ctx.body = users;
		ctx.status = 200;
	})
	.get('/contacts/:name', async ctx => {
		try {
			const userNameParam = ctx.params.name;
			if (!userNameParam) {
				return ctx.throw(404, 'для данного пользователя не найдено контактов');
			}
			ctx.body = users.find(currentUser => currentUser.name === userNameParam);
			ctx.status = 200;
		} catch (err) {
			console.log(err);
		}
	})
	.post('/contacts', bodyParser, async ctx => {
		try {
			const newUserData = {
				name: ctx.request.body.name,
				phone: ctx.request.body.phone
			};
			users.push(newUserData);
			fs.writeFile('./db/users.json', JSON.stringify(users), function (err) {
				if (err) {
					console.log(err);
				}
			});
			ctx.body = newUserData;
		} catch (err) {
			console.log(err);
		}
	})
	.post('/contacts/foto', busboy, /*imgMin,*/ async ctx => {
		ctx.body = ctx.request.body;
	});

module.exports = app => {
	app.use(publicRouter.routes());
	app.use(apiRouter.routes());
};