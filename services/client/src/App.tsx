import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './hooks/store';
import { checkAuthUser, setIsLoading } from './store/slices/authSlice';
import { LOGIN_PAGE_ROUTE } from './config/routes/client/public/auth/login';
import LoginPage from './pages/LoginPage';
import { REGISTRATION_PAGE_ROUTE } from './config/routes/client/public/auth/registration';
import RegistrationPage from './pages/RegistrationPage';
import { MAIN_PAGE_ROUTE } from './config/routes/client/private';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthRoute from './components/AuthRoute';
import { NEEDS_AUTH_PAGE_ROUTE } from './config/routes/client/public/auth/needs';
import NeedsAuthPage from './pages/NeedsAuthPage';
import PublicRoute from './components/PublicRoute';
import { ALREADY_AUTH_PAGE_ROUTE } from './config/routes/client/private/auth/already';
import AlreadyAuthPage from './pages/AlreadyAuthPage';

const App: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			const res = dispatch(checkAuthUser());
			res.then(() => {});
		} else {
			dispatch(setIsLoading(false));
		}
	}, []);

	// теперь нужно страницы авторизации и регистрации блокировать для авторизованных пользователей и редиректить на главную странцу системы - есть
	// при неудачной попытке аутентификации не делать редирект на закрытый контур системы - есть
	// при неудачной попытке аутентификации выводить ошибку пользователю - есть
	// при неудачной попытке аутентификации не перезагружать странцу

	return (
		<Routes>
			<Route path={LOGIN_PAGE_ROUTE} element={<PublicRoute />}>
				<Route path={''} element={<LoginPage />} />
			</Route>
			<Route path={REGISTRATION_PAGE_ROUTE} element={<PublicRoute />}>
				<Route path={''} element={<RegistrationPage />} />
			</Route>
			<Route path={NEEDS_AUTH_PAGE_ROUTE} element={<PublicRoute />}>
				<Route path={''} element={<NeedsAuthPage />} />
			</Route>

			<Route path={MAIN_PAGE_ROUTE} element={<AuthRoute />}>
				<Route path={''} element={<MainPage />} />
			</Route>
			<Route path={ALREADY_AUTH_PAGE_ROUTE} element={<AuthRoute />}>
				<Route path={''} element={<AlreadyAuthPage />} />
			</Route>

			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	);
};

export default App;
