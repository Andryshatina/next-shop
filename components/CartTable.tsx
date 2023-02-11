import DeleteCartItemWidget from './DeleteCartItemWidget';
import UpdateCartItemWidget from './UpdateCartItemWidget';

interface CartTableProps {
	cartItems: CartItem[];
}

interface Cart {
	items: (Product & { quantity: number; itemTotal: number })[];
	total: number;
}

interface CartItem {
	id: number;
	product: Product;
	quantity: number;
}

interface Product {
	id: number;
	title: string;
	price: number;
}

const formatCurrency = (value: number): string => {
	return '$' + value.toFixed(2);
}

const buildCart = (cartItems: CartItem[]): Cart => {
	//console.log(cartItems);
	let total = 0.0;
	const items = [];
	for (const item of cartItems) {
		const itemTotal = item.product.price * item.quantity;
		total += itemTotal;
		items.push({
			id: item.id,
			title: item.product.title,
			price: item.product.price,
			quantity: item.quantity,
			itemTotal
		});
	}
	//console.log(items);
	return { items, total };
};

const CartTable = ({ cartItems }: CartTableProps): JSX.Element => {
	const { items, total } = buildCart(cartItems);
	//console.log(items);
	return (
		<table className='w-full border-collapse  border-gray-700'>
			<thead className='bg-gray-200'>
				<tr>
					<th className='border border-gray-700 text-left p-2'>Product</th>
					<th className='border border-gray-700 text-right p-2'>Price</th>
					<th className='border border-gray-700 text-right p-2'>Quantity</th>
					<th className='border border-gray-700 text-right p-2'>Total</th>
				</tr>
			</thead>
			<tbody>
				{items.map(({ id, title, price, quantity, itemTotal }) => (
					<tr key={id}>
						<td className='border border-gray-700 text-left p-2'>{title}</td>
						<td className='border border-gray-700 text-right p-2'>{price}</td>
						<td className='border border-gray-700 text-right p-2'>
							<UpdateCartItemWidget productId={id} quantity={quantity} />
						</td>
						<td className='border border-gray-700 text-right p-2'>{formatCurrency(itemTotal)}</td>
						<td>
							<DeleteCartItemWidget productId={id} />
						</td>


					</tr>
				))}
			</tbody>
			<tfoot>
				<tr>
					<td className='p-2'>Total</td>
					<td></td>
					<td></td>
					<td className=' text-right p-2'>{formatCurrency(total)}</td>
				</tr>
			</tfoot>
		</table>
	)

};

export default CartTable;