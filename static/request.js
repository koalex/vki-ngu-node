import {refreshTokens} from './auth.js';

export default async function request(url, opts) {
	const accessTokenExpires = localStorage.getItem('access_token_expires');
	const refreshTokenExpires = localStorage.getItem('refresh_token_expires');

	if (accessTokenExpires && refreshTokenExpires) {
		const now = Date.now();
		if (now >= accessTokenExpires) {
			await refreshTokens();
		}
	}


	return await fetch(url, opts);
}
