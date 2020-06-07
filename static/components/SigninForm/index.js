import Form   from '../core/Form/index.js';
import Input  from '../core/Input/index.js';
import Button from '../Button/index.js';

const email = new Input({name: 'email', placeholder: 'Email'});
const password = new Input({type: 'password', name: 'password', placeholder: 'Пароль'});
const button = new Button({type: 'submit', content: 'Войти'});

class SigninForm extends Form{
	constructor(props) {
		super(props);
		this.loadCss('components/SigninForm/styles.css');
	}
	template = `
		<form class="signin-form" action="/api/signin" method="POST" enctype="application/x-www-form-urlencoded">
            ${email.render().outerHTML}
         	${password.render().outerHTML}
            ${button.render().outerHTML}
        </form>`;
}

export default SigninForm;
