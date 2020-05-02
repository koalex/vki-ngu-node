const Router = require('koa-router');
const bodyParser = require('./middlewares/bodyParser');
const busboy = require('./middlewares/busboy');
// const imgMin = require('./middlewares/imageMin');

const publicRouter = new Router();
const apiRouter = new Router({
	prefix: '/api'
});

const users = {vasya: 8913123123, petya: 89031286756};

publicRouter
	.get('/contacts', async ctx => {
		ctx.body = 'СТРАНИЦА КОНТАКТЫ';
	});

apiRouter
	.get('/contacts', async ctx => {
		ctx.status = 200;
		ctx.body = users;
	})
	.get('/contacts/:user', async ctx => {
		if (!users[ctx.params.user]) {
			return ctx.throw(404, 'для данного пользователя не найдено контактов');
		}
		ctx.body = users[ctx.params.user];
	})
	.post('/contacts', bodyParser, async ctx => {
		users[ctx.request.body.user] = ctx.request.body.phone;
		ctx.status = 200;
	})
	.post('/contacts/foto', busboy, /*imgMin,*/ async ctx => {
		ctx.body = ctx.request.body;
	});

module.exports = app => {
	app.use(publicRouter.routes());
	app.use(apiRouter.routes());
};