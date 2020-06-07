import Component from '../core/Component.js';

class ChatMessages extends Component{
	constructor(props) {
		super(props);
		this.loadCss('components/ChatMessages/styles.css');
		this._messages = props.messages || [];
	}
	get messages() {
		return this._messages;
	}
	set messages(messages) {
		this._messages = messages;
		this.reRender();
		this.element.scrollTop = this.element.scrollHeight;
	}
	get template() {
		return '<ul class="messages-list container">' + this.messages.map(msg => {
			return `<li class="messages-list__item container ${msg.author_id === 1 ? 'self' : ''}" data-message-id="${msg._id}">
	                ${msg.text}
	                <hr>
	                <div class="message-meta">
	                	<span class="message-author">${msg.author_id === 1 ? 'Вы' : 'Вася'}</span>
	                	<span class="message-time">14:07</span>
					</div>
	                
	            </li>`;
		}).join('') + '</ul>';
	}
}

export default ChatMessages;
