export async function loadUser() {
	const response = await fetch('/api/me');

	if (response.ok) {
		const user = await response.json();
		localStorage.setItem('user', JSON.stringify(user));
		return user;
	} else {
		localStorage.removeItem('user');
	}
}

export async function refreshTokens() {
	const response = await fetch('/api/me');

	if (response.ok) {
		const user = await response.json();
		localStorage.setItem('user', user);
		return user;
	} else {
		localStorage.setItem('user', null);
	}
}

export async function signin(ev) {
	ev.preventDefault();
	const credentials = Array.from(ev.target.elements).reduce((acc, formEl) => {
		if (formEl.name) acc[formEl.name] = formEl.value;
		return acc;
	}, {});

	const response = await fetch('/api/signin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});

	if (response.ok) {
		await loadUser();
		return true;
	} else {
		alert('ОШИБКА');
	}
}

export async function signup(ev) {
	ev.preventDefault();
	const credentials = Array.from(ev.target.elements).reduce((acc, formEl) => {
		if (formEl.name) acc[formEl.name] = formEl.value;
		return acc;
	}, {});

	const response = await fetch('/api/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});

	if (response.ok) {
		// http://localhost:3000/api/email-confirm/email_validation_token
		const confirmToken = await response.text();

		alert('ПЕРЕЙДИТЕ ПО ССЫЛКЕ ДЛЯ АКТИВАЦИИ ' + window.location.origin + '/api/email-confirm/' + confirmToken)
		// await loadUser();
	} else {
		alert('ОШИБКА');
	}
}

export async function signout() {
	const response = await fetch('/api/signout');

	if (response.ok) {
		localStorage.setItem('user', null);
		return true;
	}
}

