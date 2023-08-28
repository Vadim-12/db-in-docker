import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	AuthState,
	SetError,
	SetIsAuth,
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
	isLoading: false,
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
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				console.log('login pending');
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				console.log('login fulfilled');
				state.isAuth = true;
				state.user = action.payload;
				state.error = '';
				state.isLoading = false;
			})
			.addCase(loginUser.rejected, (state, action) => {
				console.log('login rejected');
				console.log(action.error);
				state.error = action.error.message;
				state.isLoading = false;
			})
			.addCase(registrationUser.pending, (state) => {
				console.log('registration pending');
				state.isLoading = true;
			})
			.addCase(registrationUser.fulfilled, (state, action) => {
				console.log('registration fulfilled');
				state.isAuth = true;
				state.user = action.payload;
				state.error = '';
				state.isLoading = false;
			})
			.addCase(registrationUser.rejected, (state, action) => {
				console.log('registration rejected');
				console.log(action.error);
				state.error = action.error.message;
				state.isLoading = false;
			})
			.addCase(logoutUser.pending, (state) => {
				console.log('logout pending');
				state.isLoading = true;
			})
			.addCase(logoutUser.fulfilled, (state, _) => {
				console.log('logout fulfilled');
				state.isAuth = false;
				state.user = {} as IUser;
				state.error = '';
				state.isLoading = false;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				console.log('logout rejected');
				console.log(action.error);
				state.error = action.error.message;
				state.isLoading = false;
			})
			.addCase(checkAuthUser.pending, (state) => {
				console.log('refresh pending');
				state.isLoading = true;
			})
			.addCase(checkAuthUser.fulfilled, (state, action) => {
				console.log('refresh fulfilled');
				state.isAuth = true;
				state.user = action.payload;
				state.error = '';
				state.isLoading = false;
			})
			.addCase(checkAuthUser.rejected, (state, action) => {
				console.log('refresh rejected');
				console.log(action.error);
				state.error = action.error.message;
				state.isLoading = false;
			});
	},
});

export const { setIsAuth, setUser, setError } = authSlice.actions;
export default authSlice;
