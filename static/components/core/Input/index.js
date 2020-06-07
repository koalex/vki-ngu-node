import Component from '../Component.js';

class Input extends Component{
	constructor(props = {}) {
		super(props);
		this.loadCss('components/core/Input/styles.css');
		this.type = props.type || 'text';
		this.name = props.name;
		this.placeholder = props.placeholder || '';
		this.autocomplete = props.autocomplete || 'off';
	}

	get template() {
		const input = document.createElement('INPUT');
		input.type = this.type;
		input.name = this.name;
		input.placeholder = this.placeholder;
		input.className = 'input';
		input.autocomplete = this.autocomplete;
		return input;
	}
}

export default Input;
