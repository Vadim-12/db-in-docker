import React from 'react';
import MainLayout from '../components/MainLayout';

const MainPage: React.FC = () => {
	return (
		<MainLayout>
			<h1>Приватный контент</h1>
			<div className='testContent'>
				<img src='/cat.jpeg' alt='cat' />
				<img src='/cat2.jpeg' alt='cat2' />
			</div>
		</MainLayout>
	);
};

export default MainPage;
