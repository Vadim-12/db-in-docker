import React, { useMemo } from 'react';
import { allRoutes } from '../config/routes';
import { useAppSelector } from '../hooks/store';
import { NavLink, useLocation } from 'react-router-dom';

const Menu: React.FC = () => {
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const location = useLocation();

	const allowedLinks = useMemo(
		() =>
			allRoutes.map(
				({ inMenu, isAuthRoute, isPublicRoute, path, name }) =>
					inMenu &&
					((isPublicRoute && !isAuth) || (isAuthRoute && isAuth)) && (
						<NavLink
							key={path}
							className={`menu__link${
								path === location.pathname ? ' currentLink' : ''
							}`}
							to={path}
						>
							{name}
						</NavLink>
					)
			),
		[isAuth, allRoutes, location]
	);

	return <nav className='menu'>{allowedLinks}</nav>;
};

export default Menu;
