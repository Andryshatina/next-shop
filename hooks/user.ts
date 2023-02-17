import { useQuery, useQueryClient, useMutation } from 'react-query';
import { fetchJson } from '../lib/api';
import { User } from '../lib/user';

const USER_QUERY_KEY = 'user';

interface SignInVariables {
	email: string;
	password: string;
}

interface SignUpVariables extends SignInVariables {
	username: string;
}

interface useSignInResult {
	signIn: (email: string, password: string) => Promise<boolean>;
	signInError: boolean;
	signInLoading: boolean;
}

interface useSignUpResult {
	signUp: (username: string, email: string, password: string) => Promise<boolean>;
	signUpError: boolean;
	signUpLoading: boolean;
}

export function useSignIn(): useSignInResult {
	const queryClient = useQueryClient();
	const mutation = useMutation<User, Error, SignInVariables>(({ email, password }) => fetchJson('/api/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password })
	}));
	return {
		signIn: async (email: string, password: string) => {
			try {
				const user = await mutation.mutateAsync({ email, password });
				queryClient.setQueryData(USER_QUERY_KEY, user);
				return true;
			}
			catch (error) {
				return false;
			}
		},
		signInError: mutation.isError,
		signInLoading: mutation.isLoading
	}
}

export function useSignUp(): useSignUpResult {
	const queryClient = useQueryClient();
	const mutation = useMutation(({ username, email, password }: SignUpVariables) => fetchJson('/api/signup', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, email, password })
	}));
	return {
		signUp: async (username: string, email: string, password: string) => {
			try {
				const user = await mutation.mutateAsync({ username, email, password });
				queryClient.setQueryData(USER_QUERY_KEY, user);
				return true;
			}
			catch (error) {
				return false;
			}
		},
		signUpError: mutation.isError,
		signUpLoading: mutation.isLoading
	}
}

export function useSignOut(): () => Promise<void> {
	const queryClient = useQueryClient();
	const mutation = useMutation(async () => {
		await fetchJson('/api/logout');
	});
	return async () => {
		mutation.mutateAsync();
		queryClient.setQueryData(USER_QUERY_KEY, undefined);
	}
}

export function useUser(): User {
	const query = useQuery<User>(USER_QUERY_KEY, async () => {
		try {
			return await fetchJson('/api/user')
		}
		catch (error) {
			return undefined;
		}
	},
		{
			staleTime: 30000,
			cacheTime: Infinity
		}
	);

	return query.data;
}