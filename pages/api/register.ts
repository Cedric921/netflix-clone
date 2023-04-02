import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../lib/prismadb';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}

	try {
		const { email, name, password } = req.body;

		const existUser = await prismadb.user.findUnique({
			where: {
				email,
			},
		});

		if (existUser) {
			return res.status(422).json({ error: 'email taken' });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prismadb.user.create({
			data: {
				name,
				email,
				image: '',
				emailVerified: new Date(),
				hashedPassword,
				updatedAt: '',
			},
		});
		return res.status(201).json(user);
	} catch (error) {
		return res.status(400).end();
	}
}
