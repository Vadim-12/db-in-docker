import UserModel from '../models/userModel';

export class UserDto {
	login: string;

	constructor(model: UserModel) {
		this.login = model.login;
	}
}
