const path = require('path');
require('dotenv').config({ path: process.env.ENV_PATH || path.resolve(process.cwd(), '.env') });
const config = require('config');

const assert        = require('assert');
const server        = require(__dirname + '/../server.js');
const request       = require('supertest')(server);

describe('ТЕСТИРОВАНИЕ СЕРВЕРА', () => {
	before(done => {
		server.listen({port: config.port}, done);
	});

	after(done => {
		// db close...
		server.close(done); // TODO: why not work ?
	});


	describe('SMOKE тест #запуск сервера', () => {
		it('should return the bound address, the address family name, and port of the server as reported by the operating system if listening on an IP socket', done => {
			let address = server.address();

			if (!['address', 'family', 'port'].every(key => key in address)) {
				return done(new Error('server does not start'));
			}

			done();
		});
	});

	describe('SMOKE тест #static-сервер', () => {
		it('должен вернуть статус 200 для GET-запроса /robots.txt', function (done) {
			this.slow(200);
			request
				.get('/robots.txt')
				.expect(200)
				.end(done);
		});
	});
});
