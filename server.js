require('dotenv').config();
const config = require('config');
const KeyGrip = require('keygrip')
global.__PROD__ = 'production' === process.env.NODE_ENV;
global.__DEV__ = 'development' === process.env.NODE_ENV;

const http = require('http');
const Koa = require('koa');
const { userAgent } = require('koa-useragent');
const responseTime = require('koa-response-time');
const logger = require('koa-logger');
const app = new Koa();
// app.on('error', err => {console.log('ОШИБКА'); }); // ЛОГИРОВАНИЕ
app.keys = new KeyGrip(['im a newer secret'], 'sha256');
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
const logMW = require('./middlewares/log');
const errMW = require('./middlewares/error');
const staticMW = require('./middlewares/static');
const passport = require('./middlewares/passport');
app.use(logMW);
app.use(errMW);
app.use(staticMW);
app.use(passport.initialize());

// ROUTES
const routes = require('./routes');
routes(app);

const server = http.createServer(app.callback());
server.listen(config.port, () => {
	console.log('СЕРВЕР СЛУШАЕТ ПОРТ:', config.port);
});
