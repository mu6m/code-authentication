import prisma from '$lib/helpers/prisma';
import { fail } from '@sveltejs/kit';

function generateRandomString(length: number) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const charactersLength = characters.length;
	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export const actions = {
	register: async () => {
		let randomString = '';
		while (true) {
			randomString = generateRandomString(128);
			try {
				await prisma.user.findFirstOrThrow({
					where: {
						id: randomString
					}
				});
			} catch {
				const user = await prisma.user.create({
					data: {
						id: randomString
					}
				});
				return {
					id: user.id
				};
			}
		}
	}
};
