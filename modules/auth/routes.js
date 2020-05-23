const Router = require('koa-router');
const bodyParser = require('../../middlewares/bodyParser');
// const busboy = require('./middlewares/busboy');
const User = require('../users/models/user');
const passport = require('./middlewares/passport');
const tokensCtrl = require('./controllers/tokens');

const apiRouter = new Router({
	prefix: '/api'
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
	.post('/signout', bodyParser, passport.authenticate('jwt', {session: false}), async ctx => {
		// TODO: сделать деавторизацию
	})
	.get('/check-jwt-auth', bodyParser, passport.authenticate('jwt', {session: false}), async ctx => {
		ctx.body = 'ДОСТУП РАЗРЕШЁН';
	})
	.get('/refresh-tokens', async ctx => {
		await tokensCtrl.refreshTokens(ctx);
	})
	.get('/users', async ctx => {
		ctx.body = await User.find();
	});

module.exports = [apiRouter];