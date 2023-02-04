import { fetchJson } from './api';

const { CMS_URL } = process.env;

export interface Product {
	id: string;
	title: string;
	description: string;
	price: number;
}

export async function getProducts(): Promise<Product[]> {
	const products = await fetchJson(`${CMS_URL}/products`);
	return products.map(stripProduct);
}

export async function getProduct(id: number): Promise<Product> {
	const product = await fetchJson(`${CMS_URL}/products/${id}`);
	return stripProduct(product);
}

function stripProduct(product: Product): Product {
	const { id, title, description, price } = product;
	return { id, title, description, price };
}
