import React, { useCallback } from 'react';
import Menu from './Menu';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { logoutUser } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PAGE_ROUTE } from '../config/routes/client/public/auth/login';

const Header: React.FC = () => {
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const handleExit = useCallback(async () => {
		const logoutResponse = await dispatch(logoutUser());
		if (logoutResponse.meta.requestStatus === 'fulfilled') {
			navigate(LOGIN_PAGE_ROUTE);
		}
	}, []);

	return (
		<header>
			<Menu />
			{isAuth && (
				<Button className='exit-btn' onClick={handleExit}>
					Выйти
				</Button>
			)}
		</header>
	);
};

export default Header;
