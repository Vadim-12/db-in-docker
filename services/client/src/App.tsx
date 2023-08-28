import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { allRoutes } from './config/routes';
import { useAppDispatch, useAppSelector } from './hooks/store';
import { checkAuthUser } from './store/slices/authSlice';
import Loader from './components/Loader';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const isLoading = useAppSelector((state) => state.auth.isLoading);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuthUser());
		}
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	const allowedRoutes = allRoutes.filter(
		(route) => route.inPublicRoutes || (route.inPrivateRoutes && isAuth)
	);

	return (
		<Routes>
			{allowedRoutes.map(({ path, component }) => (
				<Route key={path} path={path} Component={component} />
			))}
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	);
};

export default App;
