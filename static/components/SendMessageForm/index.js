import Form   from '../core/Form/index.js';
import Button from '../Button/index.js';

const button = new Button({type: 'submit', content: 'Отправить'});

class SendMessageForm extends Form{
	constructor(props) {
		super(props);
		this.loadCss('components/SendMessageForm/styles.css');
	}
	template = `
		<form class="send-message-form" action="/api/chats/messages" method="POST" enctype="application/x-www-form-urlencoded">
            <textarea name="message"></textarea>
            ${button.render().outerHTML}
        </form>`;
}

export default SendMessageForm;
