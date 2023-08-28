import React from 'react';
import { allRoutes } from '../config/routes';
import { useAppSelector } from '../hooks/store';
import { NavLink, useLocation } from 'react-router-dom';

const Menu: React.FC = () => {
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const location = useLocation();

	return (
		<nav className='menu'>
			{allRoutes.map((route) =>
				route.inMenu &&
				((!isAuth && route.inPublicRoutes) ||
					(isAuth && route.inPrivateRoutes)) ? (
					<NavLink
						key={route.path}
						className={`menu__link${
							route.path === location.pathname ? ' currentLink' : ''
						}`}
						to={route.path}
					>
						{route.name}
					</NavLink>
				) : null
			)}
		</nav>
	);
};

export default Menu;
