import Component from '../core/Component.js';

class ChatsList extends Component{
	constructor(props) {
		super(props);
		this.loadCss('components/ChatsList/styles.css');
		this._chats = props.chats || [];
		this.addEventListener('pointerdown', this.onChatItemClick);
	}
	set chats(chats) {
		this._chats = chats;
		this.reRender();
	}
	get chats() {
		return this._chats;
	}
	onChatItemClick = ev => {
		if (ev.target.dataset.chatId && !ev.target.classList.contains('selected')) {
			this.element.querySelector('.selected').classList.remove('selected');
			ev.target.classList.add('selected');
		}
	}
	get template() {
		return '<ul class="chats-list">' + this.chats.map((chat, i) => {
			return `<li class="chats-list__item container ${!i ? 'selected' : ''}" data-chat-id="${chat._id}">
	                ${chat.title}
	            </li>`;
		}).join('') + '</ul>';
	}
}

export default ChatsList;
