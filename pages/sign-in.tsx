import Button from '../components/Button';
import Field from '../components/Field';
import Input from '../components/Input';
import Page from '../components/Page';
import { useState } from 'react';
import { fetchJson } from '../lib/api';
import { useRouter } from 'next/router';

const SignInPage = (): JSX.Element => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [status, setStatus] = useState({ loading: false, error: false });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus({ loading: true, error: false });
		try {
			const response = await fetchJson('http://localhost:3000/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});
			router.push('/');
			setStatus({ loading: false, error: false });
		} catch (error) {
			setStatus({ loading: false, error: true });
		}
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
						{status.error && (
							<p className="text-red-500 text-xs italic mb-5">Something went wrong.</p>
						)}
						<div className="flex items-center justify-between">
							{status.loading ? <p>Loading...</p> : (
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