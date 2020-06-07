import Component from '../core/Component.js';

class Modal extends Component{
	constructor(props = {}) {
		super({container: 'body', ...props});
		this.loadCss('components/Modal/styles.css');
		this.content = props.content;
		this.addEventListener('pointerdown', this.onOverlayClick);
		this.onClose = props.onClose;
	}
	onOverlayClick = ev => {
		if (ev.target.dataset.overlay) {
			this.hide();
			if ('function' === typeof this.onClose) {
				this.onClose();
			}
		}
	}
	get template() {
		const overlay = document.createElement('DIV');
		overlay.className = 'modal-overlay';
		overlay.dataset.overlay = true;
		overlay.hidden = true;
		const div = document.createElement('DIV');
		div.className = 'modal container';
		overlay.insertAdjacentElement('beforeend', div);

		if (this.content instanceof HTMLElement) {
			div.insertAdjacentElement('beforeend', this.content);
		} else if ('string' === typeof this.content) {
			div.insertAdjacentHTML('beforeend', this.content);
		}

		return overlay;
	}
}

export default Modal;
