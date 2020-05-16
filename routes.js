const Router = require('koa-router');
const bodyParser = require('./middlewares/bodyParser');
// const busboy = require('./middlewares/busboy');
const User = require('./models/user');
const passport = require('./middlewares/passport');
const tokensCtrl = require('./controllers/tokens');

const publicRouter = new Router();
const apiRouter = new Router({
	prefix: '/api'
});

publicRouter
	.get('/contacts', async ctx => {
		ctx.body = 'СТРАНИЦА КОНТАКТЫ';
	});

apiRouter
	.post('/signup', bodyParser, async ctx => {
		const userData = ctx.request.body;
		const newUser = new User(userData);
		await newUser.save();
		ctx.status = 200;
	})
	.post('/signin', bodyParser, passport.authenticate('local', {session: false}), async ctx => {
		const tokens = tokensCtrl.createTokens(ctx.state.user);
		await tokensCtrl.setTokensCookies(ctx, tokens);
		ctx.body = ctx.state.user;
	})
	.get('/users', async ctx => {
		ctx.body = await User.find();
	});

module.exports = app => {
	app.use(publicRouter.routes());
	app.use(apiRouter.routes());
};