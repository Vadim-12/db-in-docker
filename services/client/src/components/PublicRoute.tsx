import React from 'react';
import { useAppSelector } from '../hooks/store';
import CheckingAuthPage from '../pages/CheckingAuthPage';
import { Navigate, Outlet } from 'react-router-dom';
import { ALREADY_AUTH_PAGE_ROUTE } from '../config/routes/client/private/auth/already';

const PublicRoute: React.FC = () => {
	const isLoading = useAppSelector((state) => state.auth.isLoading);
	const isAuth = useAppSelector((state) => state.auth.isAuth);

	if (isLoading) {
		return <CheckingAuthPage />;
	}
	return isAuth ? <Navigate to={ALREADY_AUTH_PAGE_ROUTE} /> : <Outlet />;
};

export default PublicRoute;
