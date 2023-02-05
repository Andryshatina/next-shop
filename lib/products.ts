import { fetchJson } from './api';

const { CMS_URL } = process.env;

export interface Product {
	id: string;
	title: string;
	description: string;
	price: number;
	imageUrl: string;
}

export async function getProducts(): Promise<Product[]> {
	const products = await fetchJson(`${CMS_URL}/products`);
	console.log(products)
	return products.map(stripProduct);
}

export async function getProduct(id: number | string): Promise<Product> {
	const product = await fetchJson(`${CMS_URL}/products/${id}`);
	return stripProduct(product);
}

function stripProduct(product: any): Product {
	const { id, title, description, price, picture: { url } } = product;
	return {
		id,
		title,
		description,
		price,
		imageUrl: CMS_URL + url
	};
}
