import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/apiException';
import tokenService from '../services/tokenService';
import ClientRequest from '../types/request';

function authMiddleware(req: ClientRequest, res: Response, next: NextFunction) {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError());
		}

		const accessToken = authorizationHeader.split(' ')[1];
		if (!accessToken) {
			return next(ApiError.UnauthorizedError());
		}

		const userData = tokenService.validateAccessToken(accessToken);
		if (!userData) {
			return next(ApiError.UnauthorizedError());
		}

		req.user = userData;
		next();
	} catch (e) {
		throw next(ApiError.UnauthorizedError());
	}
}

export default authMiddleware;
