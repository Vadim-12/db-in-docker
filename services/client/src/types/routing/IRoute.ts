import React from 'react';

interface IRoute {
	path: string;
	name: string;
	component: React.FC;
	inPublicRoutes: boolean;
	inPrivateRoutes: boolean;
	inMenu: boolean;
}

export default IRoute;
