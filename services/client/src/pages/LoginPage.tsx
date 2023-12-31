import { Box, Button, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { REGISTRATION_PAGE_ROUTE } from '../config/routes/client/public/auth/registration';
import { validateLogin, validatePassword } from '../utils/validation';
import { loginUser, setError } from '../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import MainLayout from '../components/MainLayout';
import { MAIN_PAGE_ROUTE } from '../config/routes/client/private';

const LoginPage: React.FC = () => {
	const [login, setLogin] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const error = useAppSelector((state) => state.auth.error);

	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	useEffect(() => {
		setLogin(localStorage.getItem('login') || '');
		setPassword(localStorage.getItem('password') || '');
	}, []);

	const onSubmit = useCallback(
		async (e: React.FormEvent<HTMLElement>) => {
			e.preventDefault();

			if (validateLogin(login) !== 'OK') {
				dispatch(setError(validateLogin(login)));
				return;
			}
			if (validatePassword(password) !== 'OK') {
				dispatch(setError(validatePassword(password)));
				return;
			}
			localStorage.setItem('login', login);
			localStorage.setItem('password', password);

			const loginResponse = await dispatch(loginUser({ login, password }));
			if (loginResponse.meta.requestStatus === 'fulfilled') {
				navigate(MAIN_PAGE_ROUTE);
			}
		},
		[login, password]
	);

	return (
		<MainLayout>
			<h1>Авторизация</h1>
			<Box component='form' className='auth-form' onSubmit={onSubmit}>
				<h2>Заполните поля</h2>
				<TextField
					label='Логин'
					autoComplete='off'
					className='auth-input'
					value={login}
					onChange={(e) => setLogin(e.target.value)}
				/>
				<TextField
					type='password'
					label='Пароль'
					autoComplete='off'
					className='auth-input'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button type='submit' className='submit-btn'>
					Войти
				</Button>
				<p>
					Еще нет аккаунта?&nbsp;
					<NavLink to={REGISTRATION_PAGE_ROUTE}>Зарегистрироваться</NavLink>
				</p>
			</Box>
			<p className='authError'>{error}</p>
		</MainLayout>
	);
};

export default LoginPage;
