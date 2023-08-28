export const validateLogin = (login: string): string =>
	login.length > 3 ? 'OK' : 'Минимальная длина логина - 4 символа';
export const validatePassword = (password: string): string => {
	let isSpecificSybmolExist = false;

	for (let item of password) {
		if (
			!(
				(item >= '0' && item <= '9') ||
				(item >= 'a' && item <= 'z') ||
				(item >= 'A' && item <= 'Z')
			)
		) {
			isSpecificSybmolExist = true;
		}
	}

	if (password.length < 5) {
		return 'Минимальная длина пароля - 5 символов';
	} else if (!isSpecificSybmolExist) {
		return 'Пароль должен содержать хотя бы один специальный символ';
	}

	return 'OK';
};
