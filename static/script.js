;document.addEventListener('DOMContentLoaded', async () => {
	// АВТОРИЗАЦИЯ
	/*
	 * Пользователя храним в localStorage
	 * */
	let isAuth = false;
	localStorage.setItem('user', null);
	const signupForm = document.querySelector('.signup-form');
	const signinForm = document.querySelector('.signin-form');
	const signoutForm = document.querySelector('.signout-form');

	async function getUser() {
		const response = await fetch('/api/me', {
			method: 'GET'
		});

		if (response.status === 200) {
			const user = await response.json();
			localStorage.setItem('user', user);
			isAuth = true;
			signupForm.hidden = true;
			signinForm.hidden = true;
			signoutForm.hidden = false;
		} else {
			signupForm.hidden = false;
			signinForm.hidden = false;
			signoutForm.hidden = true;
		}
	}
	signin();
	signout();

	await getUser();


	function signup() {
		signinForm.addEventListener('submit', async ev => {
			ev.preventDefault();
			const email = signinForm.email.value;
			const password = signinForm.password.value;

			const response = await fetch('/api/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({email, password}),
			});

			if (response.ok) {
				await getUser();
				signinForm.hidden = true;
				signoutForm.hidden = false;
			}
		});
	}

	function signin() {
		const signinForm = document.querySelector('.signin-form');
		const signoutForm = document.querySelector('.signout-form');

		signinForm.addEventListener('submit', async ev => {
			ev.preventDefault();
			const email = signinForm.email.value;
			const password = signinForm.password.value;

			const response = await fetch('/api/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({email, password}),
			});

			if (response.ok) {
				await getUser();
				signinForm.hidden = true;
				signoutForm.hidden = false;
			}
		});
	}
	function signout() {
		const signinForm = document.querySelector('.signin-form');
		const signoutForm = document.querySelector('.signout-form');

		signinForm.addEventListener('submit', async ev => {
			ev.preventDefault();
			const response = await fetch('/api/signout', {method: 'POST',});

			if (response.ok) {
				let isAuth = false;
				localStorage.setItem('user', null);
				signinForm.hidden = false;
				signoutForm.hidden = true;
			}
		});
	}
});