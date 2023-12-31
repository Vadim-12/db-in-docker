import ApiError from '../exceptions/apiException';
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';
import tokenService from './tokenService';
import { UserDto } from '../dtos/userDto';

class AuthService {
	async registration(login: string, password: string) {
		const candidate = await UserModel.findOne({ where: { login } });

		if (candidate) {
			throw ApiError.BadRequest(
				`Пользователь с логином ${login} уже существует`
			);
		}

		const hashPassword = await bcrypt.hash(password, 3);
		const user = UserModel.create({ login, password: hashPassword });
		await user.save();

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(user.login, tokens.refreshToken);

		return { ...tokens, user };
	}

	async login(login: string, password: string) {
		const user = await UserModel.findOne({ where: { login } });
		if (!user) {
			throw ApiError.BadRequest(`Пользователь с логином ${login} не найден`);
		}

		const isPasswordEquals = await bcrypt.compare(password, user.password);
		if (!isPasswordEquals) {
			throw ApiError.BadRequest('Неверный пароль');
		}

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(user.login, tokens.refreshToken);

		return { ...tokens, user };
	}

	async logout(refreshToken: string) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}

		const userData = tokenService.validateRefreshToken(
			refreshToken
		) as UserModel;
		const tokenFromDb = await tokenService.findToken(refreshToken);

		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}

		const user = await UserModel.findOne({ where: { login: userData.login } });
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		if (!user) {
			throw ApiError.BadRequest('Владельца токена не найдено');
		}

		await tokenService.saveToken(userDto.login, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}
}

export default new AuthService();
