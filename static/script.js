import Modal            from './components/Modal/index.js';
import SignupBtn        from './components/SignupButton/index.js';
import SignupForm       from './components/SignupForm/index.js';
import SigninForm       from './components/SigninForm/index.js';
import SignoutForm      from './components/SignoutForm/index.js';
import ChatCreationForm from './components/ChatCreationForm/index.js';
import ChatsList        from './components/ChatsList/index.js';
import ChatMessages     from './components/ChatMessages/index.js';
import SendMessageForm  from './components/SendMessageForm/index.js';
import {loadUser}       from './auth.js';
import fixtures         from './fixtures.js';

const signupBtn = new SignupBtn({container: 'header'});
const signupForm = new SignupForm();
const modal = new Modal({content: signupForm.render()});
const signinForm = new SigninForm({container: 'header'});
const signoutForm = new SignoutForm({container: 'header'});
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

async function init() {
	const user = await loadUser();

	if (!user) {
		signinForm.hidden = false;
		signupBtn.hidden = false;
	} else {
		signoutForm.hidden = false;
	}

}

// signupForm.disabled = true;
