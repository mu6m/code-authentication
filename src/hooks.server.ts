import type { Handle } from '@sveltejs/kit';
import { verifyAccessToken } from '$lib/helpers/jwt';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('jwt');

	const routes = event.url.pathname.split('/').slice(1);
	if (!session) {
		if (routes[0] === 'dashboard') {
			return new Response(null, {
				status: 302,
				headers: { location: '/auth/login' }
			});
		}
	}

	const user = await verifyAccessToken(session);

	if (!user) {
		// event.cookies.delete('user', { path: '/' });
		return await resolve(event);
	}

	// if `user` exists set `events.local`
	if (user) {
		event.locals.user = {
			id: user.id,
			username: user.username,
			email: user.email,
			name: user.name
		};
	}

	// load page as normal
	return await resolve(event);
};
