const chats = (new Array(30)).fill(1).map((_, i) => {
	return {_id: i, title: 'Чат ' + (i + 1)};
});
const messages = (new Array(30)).fill(1).map((_, i) => {
	return i % 2 ? {author_id: 2, chat_id: 1, text: 'Сообщение другого пользователя'} : {author_id: 1, chat_id: 1, text: 'Своё сообщение'}
});

export default {
	chats,
	messages,
}