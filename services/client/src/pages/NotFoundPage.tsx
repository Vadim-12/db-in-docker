import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PAGE_ROUTE } from '../config/routes/client/public/auth/login';
import { useAppSelector } from '../hooks/store';
import { MAIN_PAGE_ROUTE } from '../config/routes/client/private';

const NotFoundPage: React.FC = () => {
	const navigate = useNavigate();

	const isAuth = useAppSelector((state) => state.auth.isAuth);

	useEffect(() => {
		setTimeout(() => {
			navigate(isAuth ? MAIN_PAGE_ROUTE : LOGIN_PAGE_ROUTE);
		}, 2000);
	}, []);

	return (
		<div className='global-wrap'>
			<div className='error-content'>
				<div className='error-code'>404</div>
				<div className='error-divider'>|</div>
				<div className='error-message'>Страница не найдена.</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
