require('dotenv').config();
const config = require('config');
const KeyGrip = require('keygrip');
global.__PROD__ = 'production' === process.env.NODE_ENV;
global.__DEV__ = 'development' === process.env.NODE_ENV;

const http = require('http');
const Koa = require('koa');
const { userAgent } = require('koa-useragent');
const responseTime = require('koa-response-time');
const logger = require('koa-logger');
const app = new Koa();
// app.on('error', err => {console.log('ОШИБКА'); }); // log
app.keys = new KeyGrip([config.secret], 'sha256');
/*
* Ставим true если используем Node.js за прокси-сервером, например за NGINX
* X-Forwarded-Host
* X-Forwarded-Proto
* X-Forwarded-For
* */
app.proxy = false;
if (__DEV__) {
	app.use(responseTime());
	app.use(logger());
}
app.use(userAgent);

// DEFAULT MIDDLEWARES
app.use(require('./middlewares/log'));
app.use(require('./middlewares/error'));
app.use(require('./middlewares/static'));

const server = http.createServer(app.callback());
const io = require('./lib/socket.js')(server);

// MODULES
require('./modules/auth')(app);
require('./modules/users')(app);
require('./modules/chat')(app);

if (!module.parent) {
	server.listen(config.port, () => {
		console.log('СЕРВЕР СЛУШАЕТ ПОРТ:', config.port);
	});
}

module.exports = server;


