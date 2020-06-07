import Component from '../core/Component.js';

class SignupButton extends Component{
	constructor(props = {}) {
		super(props);
		this.loadCss('components/SignupButton/styles.css');
		this.type = props.type || 'button';
		this.content = props.content || 'Регистрация';
	}
	get template() {
		const button = document.createElement('BUTTON');
		button.type = this.type;
		button.className = 'button signup-button';
		if (this.content instanceof HTMLElement) {
			button.insertAdjacentElement('beforeend', this.content);
		} else if ('string' === typeof this.content) {
			button.insertAdjacentHTML('beforeend', this.content);
		}
		return button;
	}
}

export default SignupButton;
