import { NextFunction, Response } from 'express';
import userService from '../services/userService';
import ApiRequest from '../types/request';

class UserController {
	async getAll(req: ApiRequest, res: Response, next: NextFunction) {
		try {
			const users = await userService.getAll();
			return res.json(users);
		} catch (e) {
			next(e);
		}
	}
}

export default new UserController();
