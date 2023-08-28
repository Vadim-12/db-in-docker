export const vars = {
	PORT: Number(process.env.PORT) || 5001,
	DB_HOST: process.env.DB_HOST || '-',
	DB_USER: process.env.DB_USER || '-',
	DB_PASSWORD: process.env.DB_PASSWORD || '-',
	DB_NAME: process.env.DB_NAME || '-',
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'test-jwt-access-secret',
	JWT_REFRESH_SECRET:
		process.env.JWT_REFRESH_SECRET || 'test-jwt-refresh-secret',
	CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3001',
};
