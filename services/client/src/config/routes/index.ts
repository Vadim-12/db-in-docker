import LoginPage from '../../pages/LoginPage';
import MainPage from '../../pages/MainPage';
import NotFoundPage from '../../pages/NotFoundPage';
import RegistrationPage from '../../pages/RegistrationPage';
import IRoute from '../../types/routing/IRoute';

const allRoutes: IRoute[] = [
	{
		path: '/',
		name: 'Главная',
		component: MainPage,
		inPublicRoutes: false,
		inPrivateRoutes: true,
		inMenu: true,
	},
	{
		path: '/auth/registration',
		name: 'Регистрация',
		component: RegistrationPage,
		inPublicRoutes: true,
		inPrivateRoutes: false,
		inMenu: true,
	},
	{
		path: '/auth/login',
		name: 'Авторизация',
		component: LoginPage,
		inPublicRoutes: true,
		inPrivateRoutes: false,
		inMenu: true,
	},
	{
		path: '*',
		name: 'Страница 404',
		component: NotFoundPage,
		inPublicRoutes: true,
		inPrivateRoutes: true,
		inMenu: false,
	},
];

export { allRoutes };
