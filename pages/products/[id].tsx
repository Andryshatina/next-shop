import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ApiError } from '../../lib/api';
import { getProducts, getProduct, Product } from '../../lib/products';

interface ProductPageParams extends ParsedUrlQuery {
	id: string;
}

interface ProductPageProps {
	product: Product;
}

export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
	const products = await getProducts();

	const paths = products.map((product) => ({
		params: { id: product.id.toString() },
	}));

	return {
		paths,
		fallback: 'blocking',
	};
}

export const getStaticProps: GetStaticProps<ProductPageProps, ProductPageParams> = async ({ params: { id } }) => {
	try {
		const product = await getProduct(id);

		return {
			props: {
				product,
			},
			revalidate: parseInt(process.env.REVALIDATE_SECONDS),
		};
	}
	catch (error) {
		if (error.status === 404 && error instanceof ApiError) {
			return {
				notFound: true,
			};
		}
		throw error;
	}
}

const ProductPage = ({ product }: ProductPageProps): JSX.Element => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="max-w-sm rounded overflow-hidden shadow-lg">
				<div className="px-6 py-4">
					<div className="font-bold text-xl mb-2">{product.title}</div>
					<p className="text-gray-700 text-base">
						{product.description}
					</p>
				</div>
				<div className="px-6 py-4">
					<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
						{product.price}$
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
