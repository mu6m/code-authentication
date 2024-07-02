import { JWT_SECRET } from '$env/static/private';
import prisma from '$lib/helpers/prisma';
import { fail } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, cookies }: any) => {
		const form_data = await request.formData();
		const id = form_data.get('id') as string;
		if (!id) {
			return fail(400);
		}
		const data = await prisma.user.findUnique({
			where: {
				id
			}
		});
		if (!data) {
			return fail(400);
		}
		await cookies.set('id', id, {
			path: '/',
			httpOnly: false,
			sameSite: 'lax',
			secure: JWT_SECRET,
			maxAge: 60 * 60 * 24 * 30
		});
		return data;
	}
};
