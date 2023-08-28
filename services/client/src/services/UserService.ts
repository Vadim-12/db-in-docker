import { AxiosResponse } from 'axios';
import { IUser } from '../types/models/IUser';
import $api from '../config/api';

export default class UserService {
	async getAll(): Promise<AxiosResponse<IUser[]>> {
		return $api.get<IUser[]>('/users');
	}
}
