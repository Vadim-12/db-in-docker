import { NextFunction, Response } from 'express';
import ApiRequest from '../types/request';
import ApiError from '../exceptions/apiException';

function errorMiddleware(
	err: Error,
	req: ApiRequest,
	res: Response,
	next: NextFunction
) {
	if (err instanceof ApiError) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors });
	}
	return res.status(500).json({ message: 'Непредвиденная ошибка на сервере' });
}

export default errorMiddleware;
