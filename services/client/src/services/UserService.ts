import { AxiosResponse } from 'axios';
import { IUser } from '../types/models/IUser';
import $api from '../config/api';
import { API_USERS_ROUTE } from '../config/routes/server/api/users';

export default class UserService {
	async getAll(): Promise<AxiosResponse<IUser[]>> {
		return $api.get<IUser[]>(API_USERS_ROUTE);
	}
}
