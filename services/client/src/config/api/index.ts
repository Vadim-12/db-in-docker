import axios from 'axios';
import { API_ROUTE } from '../routes/server/api';
import { API_REFRESH_ROUTE } from '../routes/server/api/auth/refresh';
import { IAuthResponse } from '../../types/response/IAuthResponse';

const $api = axios.create({
	withCredentials: true,
	baseURL: API_ROUTE,
});

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

$api.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response.status === 401 &&
			error.config &&
			!error.config.isRetry
		) {
			originalRequest.isRetry = true;
			try {
				const response = await axios.get<IAuthResponse>(API_REFRESH_ROUTE, {
					withCredentials: true,
				});
				localStorage.setItem('token', response.data.accessToken);
				return $api.request(originalRequest);
			} catch (e) {
				console.log('Пользователь не авторизован');
			}
		}
		throw error;
	}
);

export default $api;
