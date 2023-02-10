import Page from '../components/Page';
import { useCart } from '../hooks/cart';
import CartTable from '../components/CartTable';
import LoadingSpinner from '../components/LoadingSpinner';


const Cart = (): JSX.Element => {
	const { cartItems, cartItemsError, cartItemsLoading } = useCart();
	console.log(cartItems)
	return (
		<Page title='Cart'>
			<div className='flex flex-col items-center py-2'>
				<div className='flex flex-col items-center justify-center w-full max-w-lg p-4 space-y-4'>
					<h1 className='text-3xl font-bold'>Cart</h1>
					{cartItemsLoading ? (
						<LoadingSpinner size='lg' />
					) : cartItemsError ? (
						<p className='text-red-500'>{cartItemsError}</p>
					) : (
						<CartTable cartItems={cartItems} />
					)}
				</div>
			</div>


		</Page>
	);
};

export default Cart;