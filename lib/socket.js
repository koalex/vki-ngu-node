const config 		 = require('config');
const fs             = require('fs');
const path           = require('path');
const join           = path.join;
const basename       = path.basename;
const extname        = path.extname;
const socketIO 		 = require('socket.io');
const memAdapter     = require('socket.io-adapter');
const socketIORedis  = require('socket.io-redis');
const log            = require('./logger').child({ level: 'error' });

function Socket(server) {
	let ioOpts = {
		transports: ['websocket', 'polling'],
		maxHttpBufferSize: 10e7, // how many bytes or characters a message can be, before closing the session (to avoid DoS)
		serveClient: false,
		allowUpgrades: true,
		httpCompression: true,
		cookie: false,
		// cookiePath: '/',
		// cookieHttpOnly: true,
		wsEngine: 'ws',
		origins: (origin, callback) => {
			return callback(null, true);
		}
	};

	let io = socketIO.listen(server, ioOpts);

	if (!global.__TEST__) {
		let adapter = socketIORedis({
			host: config.redis.host,
			port: config.redis.port,
			// password: config.redis.pass,
			retry_strategy: redisRetryStrategy
		});

		adapter.pubClient.on('connect', () => {
			io.adapter(adapter);
		});
		// adapter.subClient.on('connect', () => {});

		adapter.pubClient.on('error', err => {
			if ('ECONNREFUSED' === err.code) {
				io.adapter(memAdapter);
			}
			__DEV__ && console.error(err);
			log.fatal(err);
		});
		adapter.subClient.on('error', err => {
			if ('ECONNREFUSED' === err.code) {
				// io.adapter(memAdapter);
			}
		});
	}

	process
		.on('SIGTERM', onSigintSigtermMessage('SIGTERM'))
		.on('SIGINT', onSigintSigtermMessage('SIGINT'))
		.on('message', onSigintSigtermMessage('message'));

	io.use(middleware);
	io.on('connection', onConnection);

	function onSigintSigtermMessage (signal) {
		return function (msg) {
			if ('message' === signal && 'shutdown' !== msg) return; // windows
			if (__DEV__) console.info('Closing socket server...');
			io.close();
		}
	}

	Socket.io = io;
	return io;
}
function middleware (socket, next) {
	socket.on('error', onSocketErr);
	next();
}
function onConnection (socket) {
	/*socket.on('message', msg => {
	 socket.emit('TEST', 'OK'); // только себе
	 socket.broadcast.emit('TEST', 'OK'); // всем кроме себя
	 socket.volatile.emit('TEST', 'OK'); // сообщение может потеряться (всем включая себя)
	 socket.volatile.broadcast.emit('TEST', 'OK'); // сообщение может потеряться (всем кроме себя)

	 socket.broadcast.to('room').emit('TEST', 'OK');
	 socket.to('room').emit('TEST', 'OK');
	 });*/
	// socket.on('disconnect', reason => {});
	console.log('ПОДКЛЮЧИЛИСЬ К SOCKET-серверу');
}

function onSocketErr (err) {
	console.error(err);
	log.fatal(err);
}


function redisRetryStrategy (options) {
	if (options.error && options.error.code === 'ECONNREFUSED' && options.attempt > 10) {
		// End reconnecting on a specific error and flush all commands with
		// a individual error
		return new Error('The server refused the connection');
	}
	if (options.total_retry_time > 1000 * 60 * 60) {
		// End reconnecting after a specific timeout and flush all commands
		// with a individual error
		return new Error('Retry time exhausted');
	}
	if (options.attempt > 10) {
		// End reconnecting with built in error
		return undefined;
	}
	// reconnect after
	return 1000;
}


module.exports = Socket;