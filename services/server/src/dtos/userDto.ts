import UserModel from '../models/userModel';

export class UserDto {
	login: string;
	password: string;
	refreshTokens: string[];

	constructor(model: UserModel) {
		this.login = model.login;
		this.password = model.password;
		this.refreshTokens = model.refreshTokens?.map((rt) => rt.refreshToken);
	}
}
