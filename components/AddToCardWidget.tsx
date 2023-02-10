import { useState } from 'react';
import { useAddToCart } from '../hooks/cart';
import { useRouter } from 'next/router';
import LoadingSpinner from './LoadingSpinner';

const AddToCardWidget = ({ productId }) => {
	const router = useRouter();

	const [quantity, setQuantity] = useState(1);

	const { addToCart, addToCartLoading, addToCartError } = useAddToCart();

	const handleAddToCart = async () => {
		const valid = await addToCart(productId, quantity);
		if (valid)
			router.push('/cart');
	};

	return (

		<div className="flex flex-row mt-3">
			<input
				className="w-16 h-10 px-2 text-center text-gray-700 bg-gray-200 rounded-l"
				type="number"
				placeholder="1"
				value={quantity.toString()}
				onChange={(e) => setQuantity(parseInt(e.target.value))}
			/>
			{addToCartLoading ? <LoadingSpinner /> : (
				<button
					className="px-8 py-2 text-white bg-emerald-700 rounded-r hover:bg-emerald-600"
					onClick={handleAddToCart}
				>
					Add to Cart
				</button>
			)}
			{addToCartError && (
				<p className="text-red-500 text-xs italic">Something went wrong</p>
			)}

		</div>



	);
};

export default AddToCardWidget;