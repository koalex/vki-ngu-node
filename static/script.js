import Modal            from './components/Modal/index.js';
import SignupBtn        from './components/SignupButton/index.js';
import SignupForm       from './components/SignupForm/index.js';
import SigninForm       from './components/SigninForm/index.js';
import SignoutForm      from './components/SignoutForm/index.js';
import ChatCreationForm from './components/ChatCreationForm/index.js';
import ChatsList        from './components/ChatsList/index.js';
import ChatMessages     from './components/ChatMessages/index.js';
import SendMessageForm  from './components/SendMessageForm/index.js';
import {
	loadUser, signup, signin, signout
} from './auth.js';
import fixtures         from './fixtures.js';

const signupBtn = new SignupBtn({container: '.auth'});
const signupForm = new SignupForm();
const modal = new Modal({content: signupForm.render()});
const signinForm = new SigninForm({container: '.auth'});
const signoutForm = new SignoutForm({container: '.auth'});
const chatCreationForm = new ChatCreationForm({container: '.new-chat'});
const chatsList = new ChatsList({container: '.chats'});
const chatMessages = new ChatMessages({container: '.chat', renderPosition: 'afterbegin', loading: true});
const sendMessageForm = new SendMessageForm({container: '.chat'});

chatsList.chats = fixtures.chats;
chatMessages.messages = fixtures.messages;

signupBtn.addEventListener('pointerdown', modal.show.bind(modal));

modal.render();
signupForm.render();
signinForm.render();
signinForm.hidden = true;
signupBtn.render();
chatCreationForm.render();
chatsList.render();
chatMessages.render();
sendMessageForm.render();
signoutForm.render();
signoutForm.hidden = true;

init();

signupForm.addEventListener('submit', signup);
signinForm.addEventListener('submit', async ev => {
	const success = await signin(ev);
	if (success) {
		signinForm.hidden = true;
		signupBtn.hidden = true;
		signoutForm.hidden = false;
		signupBtn.hidden = true;
	}
});
signoutForm.addEventListener('submit', async ev => {
	const success = await signout(ev);
	if (success) {
		signinForm.hidden = false;
		signupBtn.hidden = false;
		signoutForm.hidden = true;
		await loadUser();
	}
});

async function init() {
	const user = await loadUser();

	if (!user) {
		signinForm.hidden = false;
		signupBtn.hidden = false;
	} else {
		signoutForm.hidden = false;
		signupBtn.hidden = true;
	}

}

// signupForm.disabled = true;
