import { IUser } from '../../models/IUser';

export interface AuthState {
	user: IUser;
	isAuth: boolean;
	isLoading: boolean;
	error?: string;
}

export type SetIsAuth = boolean;

export type SetUser = IUser;

export type SetError = string;

export type SetIsLoading = boolean;
