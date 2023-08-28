const vars = {
	PORT: Number(import.meta.env.VITE_PORT) || 3001,
	CLIENT_URL: import.meta.env.VITE_CLIENT_URL || 'http://localhost:3001',
	SERVER_URL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5001',
};

export default vars;
