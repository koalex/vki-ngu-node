export async function loadUser() {
	const response = await fetch('/api/me');

	if (response.ok) {
		const user = await response.json();
		localStorage.setItem('user', user);
		return user;
	} else {
		localStorage.setItem('user', null);
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

export async function signin() {
	// TODO
}

export async function signup() {
	// TODO
}

export async function signout() {
	const response = await fetch('/api/signout', {method: 'POST',});

	if (response.ok) {
		localStorage.setItem('user', null);
		return true;
	}
}

