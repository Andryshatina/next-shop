import Page from '../components/Page';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSignUp } from '../hooks/user';
import LoadingSpinner from '../components/LoadingSpinner';
import Link from 'next/link';
import Field from '../components/Field';
import Input from '../components/Input';

const SignUp = (): JSX.Element => {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');


	const { signUp, signUpError, signUpLoading } = useSignUp();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const valid = await signUp(username, email, password);
		if (valid)
			router.push('/');
	};

	return (
		<Page title="Sign Up">
			<div className="container mx-auto h-full flex justify-center items-center">
				<div className="w-full max-w-xs">
					<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
						<div className="mb-4">
							<h1 className="text-center text-3xl font-bold">Sign Up</h1>
						</div>
						<Field title="Username">
							<Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
						</Field>
						<Field title="Email">
							<Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
						</Field>
						<Field title="Password">
							<Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</Field>
						<Field title="Confirm Password">
							<Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
						</Field>
						{signUpError && (
							<p className="text-red-500 text-xs italic mb-5">Something went wrong</p>
						)}
						<div className="flex items-center">
							<button className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
								{signUpLoading ? <LoadingSpinner size="sm" /> : 'Sign Up'}
							</button>
						</div>
						<div className="mt-3 flex items-center justify-between">
							<Link className="text-green-800 hover:text-green-700 no-underline" href="/sign-in">
								Already have an account?
							</Link>
						</div>
					</form>
				</div>
			</div>
		</Page>
	);
};

export default SignUp;