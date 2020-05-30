const Socket = require('../../../lib/socket');

Socket.io.use(
	function middleware (socket, next) {
		// socket.handshake
		// Если пользователь авторизован, то
		// socket.join('admins');
		// Иначе socket.join('puplic-chat');
		next();
	}
)

Socket.io.on('connection', socket => {});

exports.sendMessage = message => {
	Socket.io.emit('MESSAGE', message);
};

