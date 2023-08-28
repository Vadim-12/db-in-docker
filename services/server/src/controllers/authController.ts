import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/apiException';
import authService from '../services/authService';
import ApiRequest from '../types/request';

class AuthController {
	async registration(req: ApiRequest, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(
					ApiError.BadRequest('Ошибка при валидации', errors.array())
				);
			}

			const { login, password } = req.body;
			const userData = await authService.registration(login, password);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async login(req: ApiRequest, res: Response, next: NextFunction) {
		try {
			const { login, password } = req.body;
			const userData = await authService.login(login, password);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async refresh(req: ApiRequest, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await authService.refresh(refreshToken);

			res.cookie('refreshToken', userData.tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async logout(req: ApiRequest, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const token = await authService.logout(refreshToken);

			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (e) {
			next(e);
		}
	}
}

export default new AuthController();
