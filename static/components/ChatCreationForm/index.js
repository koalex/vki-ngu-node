import Form   from '../core/Form/index.js';
import Input  from '../core/Input/index.js';
import Button from '../Button/index.js';

const input = new Input({name: 'chat', placeholder: 'Название'});
const button = new Button({type: 'submit', content: 'Создать чат'});


class ChatCreationForm extends Form{
	constructor(props) {
		super(props);
		this.loadCss('components/ChatCreationForm/styles.css');
	}
	template = `
		<form class="new-chat-form" action="/api/chats" method="POST" enctype="application/x-www-form-urlencoded">
            ${input.render().outerHTML}
			${button.render().outerHTML}
        </form>`;
}

export default ChatCreationForm;
