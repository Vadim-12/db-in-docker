import { ReactChild, ReactFragment, ReactPortal } from 'react';

interface IRoute {
	path: string;
	name: string;
	component?:
		| ReactChild
		| ReactFragment
		| ReactPortal
		| boolean
		| null
		| undefined;
	isPublicRoute: boolean;
	isAuthRoute: boolean;
	inMenu: boolean;
}

export default IRoute;
