class Component{
	constructor({container, renderPosition}) {
		this.container = 'string' === typeof container ? document.querySelector(container) : container;
		this.renderPosition = renderPosition || 'beforeend';
		this._listeners = [];
		this._styles = [];
	}
	_createEl() {
		const template = this.template;
		if ('string' === typeof template) {
			const div = document.createElement('DIV');
			div.innerHTML = template.trim();
			if (div.childNodes.length > 1) {
				throw new Error('template должен быть одиночным элементом');
			}
			const el = div.childNodes[0];
			div.remove();
			return el;
		} else if (template instanceof HTMLElement) {
			return template;
		}
	}
	get element() {
		if (!this._el)  {
			this._el = this._createEl();
		}
		return this._el;
	}
	get hidden() {
		return this.element.hidden;
	}
	set hidden(v) {
		this.element.hidden = !!v;
	}
	hide() {
		this.element.hidden = true;
	}
	show() {
		this.element.hidden = false;
	}
	remove(removeStyles) {
		this.removeAllListeners();
		this.element.remove();
		this._el = null;
		if (removeStyles) {
			while (this._styles.length) {
				this._styles.pop().remove();
			}
		}
	}
	destroy(removeStyles) { // alias for this.remove()
		this.remove(removeStyles);
	}
	addEventListener(eventType, callback, selector) {
		if (!selector) {
			this.element.addEventListener(eventType, callback);
			this._listeners.push([eventType, callback]);
		} else if ('string' === typeof selector) {
			const elems = this.element.querySelectorAll(selector);
			for (const el of elems) {
				el.addEventListener(eventType, callback);
			}
			this._listeners.push([eventType, callback, selector]);
		}
	}
	removeListener(eventType, callback, nodeOrSelector) {
		// TODO
	}
	removeAllListeners() {
		while (this._listeners.length) {
			const l = this._listeners.pop();
			if (l.length === 2) {
				this.element.removeEventListener(l[0], l[1]);
			} else if (l.length === 3) {
				const elems = this.element.querySelectorAll(l[2]);
				for (const el of elems) {
					el.removeEventListener(l[0], l[1]);
				}
			}
		}
	}
	addStyle(styleString) {
		const style = document.createElement('style');
		style.textContent = styleString;
		document.head.append(style);
		document.head.insertAdjacentElement('beforeend', style);
		this._styles.push(style);
		return style;
	}
	loadCss(href) {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = href;
		document.head.insertAdjacentElement('beforeend', link);
		this._styles.push(link);
		return link;
	}
	reRender() {
		const listeners = [...this._listeners];
		this.destroy();
		for (const [eventType, callback, selector] of listeners) {
			this.addEventListener(eventType, callback, selector);
		}
		this.render();
	}
	render() {
		if (this.container) {
			this.container.insertAdjacentElement(this.renderPosition, this.element);
		}
		return this.element;
	}
}

export default Component;
