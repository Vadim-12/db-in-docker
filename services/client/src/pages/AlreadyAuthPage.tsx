import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MAIN_PAGE_ROUTE } from '../config/routes/client/private';

const AlreadyAuthPage: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate(MAIN_PAGE_ROUTE);
		}, 2000);
	}, []);

	return (
		<div className='global-wrap'>
			<div className='error-content'>
				<div className='error-message'>Вы уже авторизованы.</div>
			</div>
		</div>
	);
};

export default AlreadyAuthPage;
