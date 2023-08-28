import UserModel from '../models/userModel';

class UserService {
	async getAll() {
		const users = await UserModel.find();
		return users;
	}
}

export default new UserService();
