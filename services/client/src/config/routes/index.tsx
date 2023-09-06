import IRoute from '../../types/routing/IRoute';

const allRoutes: IRoute[] = [
	{
		path: '/',
		name: 'Главная',
		//component: <MainPage />,
		isPublicRoute: false,
		isAuthRoute: true,
		inMenu: true,
	},
	{
		path: '/auth/registration',
		name: 'Регистрация',
		//component: <RegistrationPage />,
		isPublicRoute: true,
		isAuthRoute: false,
		inMenu: true,
	},
	{
		path: '/auth/login',
		name: 'Авторизация',
		//component: <LoginPage />,
		isPublicRoute: true,
		isAuthRoute: false,
		inMenu: true,
	},
	{
		path: '*',
		name: 'Страница 404',
		//component: <NotFoundPage />,
		isPublicRoute: true,
		isAuthRoute: true,
		inMenu: false,
	},
];

export { allRoutes };
