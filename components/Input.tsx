interface InputProps {
	type: 'text' | 'email' | 'password';
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, onChange, value, placeholder }: InputProps): JSX.Element => {
	return (
		<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
			type={type}
			placeholder={placeholder}
			value={value}
			required={true}
			onChange={onChange}
		/>
	);
};

export default Input;