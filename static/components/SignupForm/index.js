import Form   from '../core/Form/index.js';
import Input  from '../core/Input/index.js';
import Button from '../Button/index.js';

const firstName = new Input({name: 'first_name', placeholder: 'Имя'});
const lastName = new Input({name: 'last_name', placeholder: 'Фамилия'});
const age = new Input({name: 'age', placeholder: 'Возраст'});
const email = new Input({name: 'email', placeholder: 'Email'});
const password = new Input({type: 'password', name: 'password', placeholder: 'Пароль'});
const password2 = new Input({type: 'password', name: 'passwordConfirmation', placeholder: 'Повторите пароль'});
const button = new Button({type: 'submit', content: 'Зарегистрироваться'});

class SignupForm extends Form{
	constructor(props = {}) {
		super(props);
		this.loadCss('components/SignupForm/styles.css');
	}
	template = `
		<form class="signup-form container" action="/api/signup" method="POST" enctype="application/x-www-form-urlencoded">
			<div class="input-container">
				${firstName.render().outerHTML}
			</div>
            <div class="input-container">
            	${lastName.render().outerHTML}
            </div>
            <div class="input-container">
            	${age.render().outerHTML}
            </div>
            <div class="input-container">
            	${email.render().outerHTML}
            </div>
            <div class="input-container">
            	${password.render().outerHTML}
            </div>
            <div class="input-container">
            	${password2.render().outerHTML}
            </div>
            <div class="input-container">
            	${button.render().outerHTML}
            </div>
        </form>`;
}

export default SignupForm;
