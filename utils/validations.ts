export const usernameValidation = (username: string) => {
	if (username.length < 3 || username.length > 20) return false;

	return true;
};
export const passwordValidation = (password: string) => {
	if (password.length < 8 ||
		password.length > 20 ||
		!password.match(/^[A-Za-z]\w{7,14}$/)
	)
		return false;

	return true;
};

export const confirmPasswordValidation = (password: string, confirmPassword: string) => {
	if (password !== confirmPassword) return false;

	return true;
};