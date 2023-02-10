import { NextApiRequest, NextApiResponse } from 'next';
import { fetchJson } from '../../lib/api';

const { CMS_URL } = process.env;

export interface CartItem {
	id: number;
	product: {
		id: number;
		title: string;
		price: number;
	};
	quantity: number;
}

const srtipCartItem = (item: any): CartItem => ({
	id: item.id,
	product: {
		id: item.product.id,
		title: item.product.title,
		price: item.product.price,
	},
	quantity: item.quantity,
});

const handleGetCart = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { jwt } = req.cookies;

		if (!jwt) return res.status(401).json({ message: 'Not authorized' });

		const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
			headers: {
				'Authorization': `Bearer ${jwt}`,
			},
		});
		if (cartItems) {
			return res.status(200).json(cartItems.map(srtipCartItem));
		} else {
			return res.status(404).json({ message: 'Something wrong with fetching cart items' });
		}
	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
};

const handlePostCart = async (req: NextApiRequest, res: NextApiResponse) => {
	const { jwt } = req.cookies;

	if (!jwt) return res.status(401).json({ message: 'Not authorized' });

	const { productId, quantity } = req.body;

	try {
		const cartItem = await fetchJson(`${CMS_URL}/cart-items`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${jwt}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ product: productId, quantity }),
		});
		if (cartItem) {
			return res.status(200).json({});
		} else {
			return res.status(404).json({ message: 'Something wrong with adding cart item' });
		}
	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
};

const handlePutCart = async (req: NextApiRequest, res: NextApiResponse) => {
	const { jwt } = req.cookies;

	if (!jwt) return res.status(401).json({ message: 'Not authorized' });

	const { productId, quantity } = req.body;

	try {
		await fetchJson(`${CMS_URL}/cart-items/${productId}`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${jwt}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ quantity }),
		});
		return res.status(200).json({});

	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
};

const handleDeleteItemCart = async (req: NextApiRequest, res: NextApiResponse) => {
	const { jwt } = req.cookies;

	if (!jwt) return res.status(401).json({ message: 'Not authorized' });

	const { productId } = req.body;

	try {
		await fetchJson(`${CMS_URL}/cart-items/${productId}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${jwt}`,
				'Content-Type': 'application/json',
			},
		});
		return res.status(200).json({});
	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
};

const handleCart = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case 'GET':
			return handleGetCart(req, res);
		case 'POST':
			return handlePostCart(req, res);
		case 'PUT':
			return handlePutCart(req, res);
		case 'DELETE':
			return handleDeleteItemCart(req, res);
		default:
			return res.status(405).end();
	}
};

export default handleCart;