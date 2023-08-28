import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export default interface ApiRequest extends Request {
	user?: string | JwtPayload;
}
