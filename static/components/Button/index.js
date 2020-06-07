import Component from '../core/Component.js';

class Button extends Component{
	constructor(props = {}) {
		super(props);
		this.loadCss('components/Button/styles.css');
		this.type = props.type || 'button';
		this.content = props.content;
	}
	get template() {
		const button = document.createElement('BUTTON');
		button.type = this.type;
		button.className = 'button';
		if (this.content instanceof HTMLElement) {
			button.insertAdjacentElement('beforeend', this.content);
		} else if ('string' === typeof this.content) {
			button.insertAdjacentHTML('beforeend', this.content);
		}
		return button;
	}
}

export default Button;
