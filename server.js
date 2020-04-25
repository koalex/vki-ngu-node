require('dotenv').config();

global.__PROD__ = 'production' === process.env.NODE_ENV;
global.__DEV__ = 'development' === process.env.NODE_ENV;

const http = require('http');
const Koa = require('koa');
const { userAgent } = require('koa-useragent');
const responseTime = require('koa-response-time');
const logger = require('koa-logger');
const app = new Koa();
/*app.on('error', err => {
	console.log('ОШИБКА'); // ЛОГИРОВАНИЕ
});*/

/*
* Ставим true если используем Node.js за прокси-сервером, например за NGINX
* X-Forwarded-Host
* X-Forwarded-Proto
* X-Forwarded-For
* */
app.proxy = false;

// MIDDLEWARE
async function mw1 (ctx, next) {
	/*
	* ctx.request - Koa
	* ctx.response - Koa
	* ctx.req - NODE
	* ctx.res - NODE
	* */
	// ctx.res.end('BYE BYE'); // ПЛОХО т.к. НЕ используем конекст Koz
	try {
		await next();
	} catch (err) {
		ctx.status = 500;
		ctx.body = 'ОШИБКА на сервере';
	}
}
async function mw2 (ctx) {
	const url = ctx.request.url; // ALIAS ctx.url
	// await new Promise(resolve => setTimeout(resolve, 2000));
	switch (url) {
		default:
			ctx.throw(404, 'Не найдено');
			break;
		case '/':
			ctx.body = 'Главная страница';
			break;
		case '/contacts':
			ctx.body = 'Контакты: 8-913-0000000';
			break;
		case '/useragent':
			ctx.body = ctx.userAgent;
			break;
	}
}
if (__DEV__) {
	app.use(responseTime());
	app.use(logger());
}
app.use(userAgent);
app.use(mw1);
app.use(mw2);

const server = http.createServer(app.callback());

server.listen(process.env.PORT || 3000);
