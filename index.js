require('dotenv').config();

global.__PROD__ = 'production' === process.env.NODE_ENV;
global.__DEV__ = 'development' === process.env.NODE_ENV;

const test = require('./test');
console.log( test );
console.log( 'NODE_ENV', process.env.NODE_ENV );
console.log( process.env.API_KEY );

if (__PROD__) {
	console.log('СЕРВЕР ЗАПУЩЕН В РЕЖИМЕ PROD')
}
