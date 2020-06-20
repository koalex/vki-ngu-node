import request from './request.js';

export async function loadUser() {
	const response = await request('/api/me');

	if (response.ok) {
		const user = await response.json();
		localStorage.setItem('user', JSON.stringify(user));
		return user;
	} else {
		localStorage.removeItem('user');
	}
}

export async function refreshTokens() { // TODO
	const response = await fetch('/api/refresh-tokens');

	if (response.ok) {
		const tokens = await response.json();
		const {access_token_expires, refresh_token_expires} = tokens;
		localStorage.setItem('access_token_expires', access_token_expires);
		localStorage.setItem('refresh_token_expires', refresh_token_expires);
	} else {
		localStorage.removeItem('access_token_expires');
		localStorage.removeItem('refresh_token_expires');
	}
}

export async function signin(ev) {
	ev.preventDefault();
	const credentials = Array.from(ev.target.elements).reduce((acc, formEl) => {
		if (formEl.name) acc[formEl.name] = formEl.value;
		return acc;
	}, {});

	const response = await request('/api/signin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});

	if (response.ok) {
		const tokens = await response.json();
		const {access_token_expires, refresh_token_expires} = tokens;
		localStorage.setItem('access_token_expires', access_token_expires);
		localStorage.setItem('refresh_token_expires', refresh_token_expires);

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

	const response = await request('/api/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});

	if (response.ok) {
		const confirmToken = await response.text();
		alert('ПЕРЕЙДИТЕ ПО ССЫЛКЕ ДЛЯ АКТИВАЦИИ ' + window.location.origin + '/api/email-confirm/' + confirmToken)
	} else {
		alert('ОШИБКА');
	}
}

export async function signout() {
	const response = await request('/api/signout');
	if (response.ok) {
		localStorage.removeItem('user');
		return true;
	}
}
