import Page from '../components/Page';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSignUp } from '../hooks/user';
import LoadingSpinner from '../components/LoadingSpinner';
import Link from 'next/link';
import Field from '../components/Field';
import Input from '../components/Input';
import WarningTag from '../components/WarningTag';
import { usernameValidation, passwordValidation, confirmPasswordValidation } from '../utils/validations';


const SignUp = (): JSX.Element => {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [validations, setValidations] = useState({
		username: null,
		password: null,
		confirmPassword: null,
	});


	const { signUp, signUpError, signUpLoading } = useSignUp();

	const handleUsernameValidation = (un: string) => {
		setUsername(un);
		const isValid = usernameValidation(un);
		setValidations({ ...validations, username: isValid });

	};

	const handlePasswordValidation = (pw: string) => {
		setPassword(pw);
		const isValid = passwordValidation(pw);
		setValidations({ ...validations, password: isValid });
	};

	const handleConfirmPasswordValidation = (cpw: string) => {
		setConfirmPassword(cpw);
		const isValid = confirmPasswordValidation(password, cpw);
		setValidations({ ...validations, confirmPassword: isValid });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validations.username || !validations.password || !validations.confirmPassword) {
			return;
		}

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
							<Input type="text" placeholder="Username" value={username} onChange={(e) => handleUsernameValidation(e.target.value)} />
							{validations.username === false && (
								<WarningTag>Username must be between 3 and 20 characters</WarningTag>
							)}
						</Field>
						<Field title="Email">
							<Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
						</Field>
						<Field title="Password">
							<Input type="password" placeholder="Password" value={password} onChange={(e) => handlePasswordValidation(e.target.value)} />
							{validations.password === false && (
								<WarningTag>Password must be between 8 and 20 characters</WarningTag>
							)}
						</Field>
						<Field title="Confirm Password">
							<Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => handleConfirmPasswordValidation(e.target.value)} />
							{validations.confirmPassword === false && (
								<WarningTag>Passwords do not match</WarningTag>
							)}
						</Field>
						{signUpError && (
							<WarningTag>Sign up error</WarningTag>
						)}
						<div className="flex items-center">
							<button className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
								{signUpLoading ? <LoadingSpinner /> : 'Sign Up'}
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