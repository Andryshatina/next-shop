import { NextApiRequest, NextApiResponse } from 'next';
import { fetchJson } from '../../lib/api';

const { CMS_URL } = process.env;

const handleUser = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') return res.status(405).end();

	try {
		const { jwt } = req.cookies;
		const user = await fetchJson(`${CMS_URL}/users/me`, {
			headers: {
				'Authorization': `Bearer ${jwt}`,
			},
		});
		if (user) {
			return res.status(200).json({ id: user.id, name: user.username });
		} else {
			return res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
};

export default handleUser;