import { NextApiRequest, NextApiResponse } from 'next';
import { fetchJson } from '../../lib/api';
import cookie from 'cookie';

const { CMS_URL } = process.env;

const handeSignup = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') return res.status(405).end();

	const { email, password, username } = req.body;

	if (!email || !password || !username) {
		return res.status(401).json({ message: 'Missing email, password or username' });
	}

	try {
		const { jwt, user } = await fetchJson(`${CMS_URL}/auth/local/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, email, password }),
		});
		res.status(200)
			.setHeader('Set-Cookie', cookie.serialize('jwt', jwt, {
				httpOnly: true,
				path: '/api',
			}))
			.json({ id: user.id, name: user.username });

	} catch (error) {
		return res.status(401).end();
	}
}

export default handeSignup;