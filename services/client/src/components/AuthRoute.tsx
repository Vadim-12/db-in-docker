import React from 'react';
import { useAppSelector } from '../hooks/store';
import CheckingAuthPage from '../pages/CheckingAuthPage';
import { Navigate, Outlet } from 'react-router-dom';
import { NEEDS_AUTH_PAGE_ROUTE } from '../config/routes/client/public/auth/needs';

const AuthRoute: React.FC = () => {
	const isLoading = useAppSelector((state) => state.auth.isLoading);
	const isAuth = useAppSelector((state) => state.auth.isAuth);

	if (isLoading) {
		return <CheckingAuthPage />;
	}
	return isAuth ? <Outlet /> : <Navigate to={NEEDS_AUTH_PAGE_ROUTE} />;
};

export default AuthRoute;
