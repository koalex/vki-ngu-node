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
		newUser.active = false;
		newUser.email_validation_token = 'uuid' + Math.random();
		await newUser.save();
		// Отпаврляем письмо на email с токеном email_validation_token
		/*
		* Для подтверждения email-а перейдите по ссылке http://localhost:3000/api/email-confirm/email_validation_token
		* */
		ctx.status = 200;
	})
	.get('/api/email-confirm/:token', async ctx => {
		const emailToken = ctx.params.token;
		const user = await User.findOne({email_validation_token: emailToken});
		if (!user) {
			return ctx.throw(404);
		}
		user.active = true;
		await user.save();
		ctx.status = 200;
	})
	.post('/signin', bodyParser, passport.authenticate('local', {session: false}), async ctx => {
		const tokens = tokensCtrl.createTokens(ctx.state.user);
		await tokensCtrl.setTokensCookies(ctx, tokens);
		ctx.status = 200;
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
	})
	.get('/me', passport.authenticate('jwt', {session: false}), async ctx => {
		ctx.body = ctx.state.user;
	});

module.exports = [apiRouter];