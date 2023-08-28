import React, { PropsWithChildren } from 'react';
import Header from './Header';
import { Container } from '@mui/material';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			<main>
				<Container className='container'>{children}</Container>
			</main>
		</>
	);
};

export default MainLayout;
