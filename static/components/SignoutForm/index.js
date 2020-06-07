import Form from '../core/Form/index.js';
import Button from '../Button/index.js';
import {signout} from '../../auth.js';

const button = new Button({type: 'submit', content: 'Выйти'});

class SignoutForm extends Form{
	constructor(props) {
		super(props);
		this.loadCss('components/SignoutForm/styles.css');
		this.addEventListener('submit', this.signout);
	}
	signout = async ev => {
		ev.preventDefault();
		this.disabled = true;
		await signout();
		this.disabled = false;
	}
	template = `
		<form class="signout-form" action="/api/signout" method="POST" enctype="application/x-www-form-urlencoded">
            ${button.render().outerHTML}
        </form>`;
}

export default SignoutForm;
