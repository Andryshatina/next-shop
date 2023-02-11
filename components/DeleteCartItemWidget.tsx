import { useRemoveFromCart } from '../hooks/cart';
import LoadingSpinner from './LoadingSpinner';

interface DeleteCartItemWidgetProps {
	productId: number;
}

const DeleteCartItemWidget = ({ productId }: DeleteCartItemWidgetProps): JSX.Element => {
	const { removeProduct, removeProductError, removeProductLoading } = useRemoveFromCart();
	return (
		<>
			{removeProductLoading ? <LoadingSpinner /> : (
				<button
					className='w-6 h-6 text-xs text-white bg-red-500 rounded-r hover:bg-red-400'
					onClick={async () => await removeProduct(productId)}
				>
					X
				</button>
			)

			}
			{removeProductError && (
				<p className='text-red-500 text-xs italic'>Something went wrong</p>
			)}
		</>
	);
};

export default DeleteCartItemWidget;