import jwt from 'jsonwebtoken';
import { vars } from '../vars';
import TokenModel from '../models/tokenModel';
import UserModel from '../models/userModel';
import { UserDto } from '../dtos/userDto';

class TokenService {
	generateTokens(payload: UserDto) {
		const accessToken = jwt.sign(payload, vars.JWT_ACCESS_SECRET, {
			expiresIn: '30m',
		});
		const refreshToken = jwt.sign(payload, vars.JWT_REFRESH_SECRET, {
			expiresIn: '30d',
		});
		return {
			accessToken,
			refreshToken,
		};
	}
	validateAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, vars.JWT_ACCESS_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}
	validateRefreshToken(token: string) {
		try {
			const userData = jwt.verify(token, vars.JWT_REFRESH_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}
	async saveToken(userLogin: string, refreshToken: string) {
		const tokenData = await TokenModel.findOne({
			where: { user: { login: userLogin } },
		});

		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			await tokenData.save();
			return tokenData;
		}

		const user = await UserModel.findOne({ where: { login: userLogin } });
		const token = TokenModel.create({ user, refreshToken });

		await token.save();
		return token;
	}
	async removeToken(refreshToken: string) {
		const tokenData = await TokenModel.delete({ refreshToken });
		return tokenData;
	}
	async findToken(refreshToken: string) {
		const tokenData = await TokenModel.findOne({ where: { refreshToken } });
		return tokenData;
	}
}

export default new TokenService();
