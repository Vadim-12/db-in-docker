import React from 'react';
import Menu from './Menu';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { logoutUser } from '../store/slices/authSlice';

const Header: React.FC = () => {
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const dispatch = useAppDispatch();

	return (
		<header>
			<Menu />
			{isAuth && <Button onClick={() => dispatch(logoutUser())}>Выйти</Button>}
		</header>
	);
};

export default Header;
