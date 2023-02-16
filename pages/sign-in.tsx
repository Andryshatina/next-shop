import Field from '../components/Field';
import Input from '../components/Input';
import Page from '../components/Page';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSignIn } from '../hooks/user';
import LoadingSpinner from '../components/LoadingSpinner';
import Link from 'next/link';

const SignInPage = (): JSX.Element => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { signIn, signInError, signInLoading } = useSignIn();


	const handleSubmit = async (e) => {
		e.preventDefault();
		const valid = await signIn(email, password);
		if (valid)
			router.push('/');
	};

	return (
		<Page title="Sign In">
			<div className="container mx-auto h-full flex justify-center items-center">
				<div className="w-full max-w-xs">
					<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
						<div className="mb-4">
							<h1 className="text-center text-3xl font-bold">Sign In</h1>
						</div>
						<Field title="Email">
							<Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
						</Field>
						<Field title="Password">
							<Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</Field>
						{signInError && (
							<p className="text-red-500 text-xs italic mb-5">Wrong login details</p>
						)}
						<div className="flex items-center justify-between">
							<button className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
								Sign In
							</button>
							{signInLoading && <LoadingSpinner size="sm" />}
						</div>
						<div className="mt-3 flex items-center justify-between">
							<p className="text-gray-500 text-xs">
								Do not have an account?

							</p>
							<Link className="text-green-800 hover:text-green-700 no-underline" href="/sign-up">
								Sign Up
							</Link>
						</div>
					</form>
					<p className="text-center text-gray-500 text-xs">
						&copy;2023 Sample Corp. All rights reserved.
					</p>
				</div>
			</div>


		</Page>
	);
};

export default SignInPage;