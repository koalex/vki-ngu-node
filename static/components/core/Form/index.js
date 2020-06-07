import Component from '../Component.js';

class Form extends Component{
	constructor(props = {}) {
		super(props);
	}
	set disabled(v) {
		const elements = this.element.elements;
		for (const el of elements) {
			if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
				el.readOnly = !!v;
			} else {
				el.disabled = !!v;
			}
		}
	}
	clear() {
		const elements = this.element.elements;
		for (const el of elements) {
			if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
				el.value = '';
			}
		}
	}
	reset() { // alias for this.clear();
		this.clear();
	}
}

export default Form;
