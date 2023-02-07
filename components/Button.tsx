interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	type: 'button' | 'submit' | 'reset';
}

const Button = ({ type, children }: ButtonProps): JSX.Element => {
	return (
		<button className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type={type}>
			{children}
		</button>
	);
};

export default Button;