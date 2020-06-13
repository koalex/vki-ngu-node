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

	describe('E2E', () => {
		it('должен создаться пользователь в БД', function (done) {
			const user = {
				first_name: 'тест',
				last_name: 'тест',
				email: 'test@test.com',
				password: 'test123',
				passwordConfirmation: 'test123',
			};
			this.slow(200);
			request
				.post('/api/signup')
				.send(user)
				.expect(200)
				// .set('Content-Type', 'application/json')
				.end(done);
		});
	});
});
