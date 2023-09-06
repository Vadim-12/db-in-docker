import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	AuthState,
	SetError,
	SetIsAuth,
	SetIsLoading,
	SetUser,
} from '../../types/store/auth';
import { IUser } from '../../types/models/IUser';
import { IAuthRequest } from '../../types/store/auth/requests/IAuthRequest';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { API_REFRESH_ROUTE } from '../../config/routes/server/api/auth/refresh';
import { IAuthResponse } from '../../types/response/IAuthResponse';

export const loginUser = createAsyncThunk(
	'auth/login',
	async (request: IAuthRequest, { rejectWithValue }) => {
		try {
			const response = await AuthService.login(request.login, request.password);
			localStorage.setItem('token', response.data.accessToken);
			return response.data.user;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);

export const registrationUser = createAsyncThunk(
	'auth/registration',
	async (request: IAuthRequest, { rejectWithValue }) => {
		try {
			const response = await AuthService.registration(
				request.login,
				request.password
			);
			localStorage.setItem('token', response.data.accessToken);
			return response.data.user;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);

export const logoutUser = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			await AuthService.logout();
			localStorage.removeItem('token');
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);

export const checkAuthUser = createAsyncThunk(
	'auth/check',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get<IAuthResponse>(API_REFRESH_ROUTE, {
				withCredentials: true,
			});
			localStorage.setItem('token', response.data.accessToken);
			return response.data.user;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);

const initialState: AuthState = {
	user: {} as IUser,
	isAuth: false,
	isLoading: localStorage.getItem('token') !== null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuth: (state: AuthState, action: PayloadAction<SetIsAuth>) => {
			state.isAuth = action.payload;
		},
		setUser: (state: AuthState, action: PayloadAction<SetUser>) => {
			state.user = action.payload;
		},
		setError: (state: AuthState, action: PayloadAction<SetError>) => {
			state.error = action.payload;
		},
		setIsLoading: (state: AuthState, action: PayloadAction<SetIsLoading>) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				console.log('login pending');
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isAuth = true;
				state.user = action.payload;
				state.error = '';
				state.isLoading = false;
				console.log('login fulfilled');
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error = (action.payload as any).response.data.message;
				state.isLoading = false;
				state.isAuth = false;
				console.log('login rejected');
			})
			.addCase(registrationUser.pending, (state) => {
				state.isLoading = true;
				console.log('registration pending');
			})
			.addCase(registrationUser.fulfilled, (state, action) => {
				state.isAuth = true;
				state.user = action.payload;
				state.error = '';
				state.isLoading = false;
				console.log('registration fulfilled');
			})
			.addCase(registrationUser.rejected, (state, action) => {
				state.error = (action.payload as any).response.data.message;
				state.isLoading = false;
				state.isAuth = false;
				console.log('registration rejected');
			})
			.addCase(logoutUser.pending, (state) => {
				state.isLoading = true;
				console.log('logout pending');
			})
			.addCase(logoutUser.fulfilled, (state, _) => {
				state.isAuth = false;
				state.user = {} as IUser;
				state.error = '';
				state.isLoading = false;
				console.log('logout fulfilled');
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.error = (action.payload as any).response.data.message;
				state.isLoading = false;
				console.log('logout rejected');
			})
			.addCase(checkAuthUser.pending, (state) => {
				state.isLoading = true;
				console.log('checkAuth pending');
			})
			.addCase(checkAuthUser.fulfilled, (state, action) => {
				state.isAuth = true;
				state.user = action.payload;
				state.error = '';
				state.isLoading = false;
				console.log('checkAuth fulfilled');
			})
			.addCase(checkAuthUser.rejected, (state, action) => {
				state.error = (action.payload as any).response.data.message;
				state.isLoading = false;
				console.log('checkAuth rejected');
			});
	},
});

export const { setIsAuth, setUser, setError, setIsLoading } = authSlice.actions;
export default authSlice;
