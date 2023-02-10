import Button from '../components/Button';
import Field from '../components/Field';
import Input from '../components/Input';
import Page from '../components/Page';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSignIn } from '../hooks/user';
import LoadingSpinner from '../components/LoadingSpinner';

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
							{signInLoading ? <LoadingSpinner /> : (
								<Button type="submit">Sign In</Button>
							)}
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