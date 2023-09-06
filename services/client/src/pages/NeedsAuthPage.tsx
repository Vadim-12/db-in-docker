import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PAGE_ROUTE } from '../config/routes/client/public/auth/login';

const NeedsAuthPage: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate(LOGIN_PAGE_ROUTE);
		}, 2000);
	}, []);

	return (
		<div className='global-wrap'>
			<div className='error-content'>
				<div className='error-code'>401</div>
				<div className='error-divider'>|</div>
				<div className='error-message'>Требуется авторизация.</div>
			</div>
		</div>
	);
};

export default NeedsAuthPage;
