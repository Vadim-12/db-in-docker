import $api from '../config/api';
import { AxiosResponse } from 'axios';
import { IAuthResponse } from '../types/response/IAuthResponse';
import { API_LOGIN_ROUTE } from '../config/routes/server/api/auth/login';
import { API_REGISTRATION_ROUTE } from '../config/routes/server/api/auth/registration';
import { API_LOGOUT_ROUTE } from '../config/routes/server/api/auth/logout';

export default class AuthService {
	static async login(
		login: string,
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>(API_LOGIN_ROUTE, { login, password });
	}

	static async registration(
		login: string,
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>(API_REGISTRATION_ROUTE, {
			login,
			password,
		});
	}

	static async logout(): Promise<void> {
		return $api.post(API_LOGOUT_ROUTE);
	}
}
