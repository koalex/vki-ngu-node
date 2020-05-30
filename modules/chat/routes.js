const Router = require('koa-router');
const bodyParser = require('../../middlewares/bodyParser');
const chatCtrl = require('./controllers/chat');
const apiRouter = new Router({
	prefix: '/api'
});

apiRouter
	.post('/chat/message', /*passport*/ bodyParser, async ctx => {
		const message = ctx.request.body.message;
		//... TODO: СДЕЛАТЬ СОХРАНЕНИЕ В БД
		/*
		* _id
		* message
		* chat_id - название чата (комнаты)
		* created_by {type: ref, User}
		* created_at {type Date} - дата создания
		* updated_at {type Date} - дата редактирования
		* */
		chatCtrl.sendMessage(message);
		ctx.status = 200;
	})
	.put('/chat/message', /*passport*/ bodyParser, async ctx => {

	});

module.exports = [apiRouter];