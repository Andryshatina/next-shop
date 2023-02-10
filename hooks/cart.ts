import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CartItem } from '../pages/api/cart';
import { fetchJson } from '../lib/api';

interface useAddToCartResult {
	addToCart: (productId: number, quantity: number) => Promise<boolean>;
	addToCartError: boolean;
	addToCartLoading: boolean;
}

interface addToCartVariables {
	productId: number;
	quantity: number;
}

interface useCartResult {
	cartItems: CartItem[];
	cartItemsLoading: boolean;
	cartItemsError: boolean;
}

export function useCart(): useCartResult {
	const query = useQuery<CartItem[]>('cartItems', async () => {
		try {
			return await fetchJson('/api/cart')
		}
		catch (error) {
			return undefined;
		}
	},
		{
			cacheTime: Infinity
		}
	);

	return {
		cartItems: query.data,
		cartItemsLoading: query.isLoading,
		cartItemsError: query.isError,
	}
}

export function useRemoveFromCart() {
	const queryClient = useQueryClient();
	const mutation = useMutation(async (productId: number) => {
		await fetchJson('/api/cart', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ productId })
		});
	}, {
		onSuccess: (() => {
			queryClient.invalidateQueries('cartItems');
		})
	}
	);
	return {
		removeProduct: async (productId: number) => {
			mutation.mutateAsync(productId);
		},
		removeProductError: mutation.isError,
		removeProductLoading: mutation.isLoading
	}
}

export function useAddToCart(): useAddToCartResult {
	const mutation = useMutation(({ productId, quantity }: addToCartVariables) => fetchJson('/api/cart', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ productId, quantity })
	}));
	return {
		addToCart: async (productId: number, quantity: number) => {
			try {
				await mutation.mutateAsync({ productId, quantity });
				return true;
			}
			catch (error) {
				return false;
			}
		},
		addToCartError: mutation.isError,
		addToCartLoading: mutation.isLoading
	}
}