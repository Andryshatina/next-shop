import Link from 'next/link';
import { Product } from '../lib/products';
import Image from 'next/image';

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps): JSX.Element => {
	return (
		<Link href={`/products/${product.id}`}>
			<Image
				className="w-full"
				src={product.imageUrl}
				alt={product.title}
				width={320}
				height={240}
			/>
			<div className="px-6 py-4 flex justify-between items-baseline">
				<div className="font-bold text-xl mb-2">
					{product.title}
				</div>
				<p className="text-gray-700 text-base">
					{product.price.toFixed(2)}$
				</p>
			</div>
		</Link>
	);
};

export default ProductCard;