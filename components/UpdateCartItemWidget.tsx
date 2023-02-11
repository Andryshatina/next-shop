import LoadingSpinner from './LoadingSpinner';
import { useUpdateCartItem } from '../hooks/cart';
import { useState } from 'react';


const UpdateCartItemWidget = ({ productId, quantity }) => {
	const { updateCart, updateCartLoading, updateCartError } = useUpdateCartItem();
	const [newQuantity, setNewQuantity] = useState(quantity);


	const handleUpdateCartItem = (value) => {
		if (value) {
			setNewQuantity(value);
			updateCart(productId, value);
		}
	};
	return (
		<>
			{updateCartLoading ? (<LoadingSpinner />) : (
				<input
					className="w-16 h-10 px-2 text-center text-gray-700 bg-gray-100 rounded-l"
					type="number"
					min={1}
					value={newQuantity.toString()}
					onChange={(e) => handleUpdateCartItem(parseInt(e.target.value))}
				/>
			)}
			{updateCartError && (
				<p className="text-red-500 text-xs italic">Something went wrong</p>
			)}
		</>
	);
};

export default UpdateCartItemWidget;
