import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
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
		<div className="flex flex-col md:flex-row px-6 py-4">
			<div className="md:w-1/2">
				<Image
					className="w-full"
					src={product.imageUrl}
					alt={product.title}
					width={640}
					height={480}
				/>
			</div>
			<div className="md:w-1/2 px-6 py-4">
				<div className="font-bold text-2xl mb-2">
					{product.title}
				</div>
				<p className="text-gray-700 text-base">
					{product.description}
				</p>
				<p className="text-gray-700 text-lg font-bold mt-3">
					{product.price.toFixed(2)}$
				</p>
			</div>
		</div>

	);
};

export default ProductPage;
