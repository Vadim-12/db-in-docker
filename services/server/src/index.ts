require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import apiRouter from './routers';
import errorMiddleware from './middlewares/errorMiddleware';
import { vars } from './vars';
import { DataSource } from 'typeorm';
import UserModel from './models/userModel';
import TokenModel from './models/tokenModel';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: vars.CLIENT_URL,
	})
);
app.use(apiRouter);
app.use(errorMiddleware);

export const appDataSource = new DataSource({
	type: 'mysql',
	host: vars.DB_HOST,
	username: vars.DB_USER,
	password: vars.DB_PASSWORD,
	database: vars.DB_NAME,
	entities: [UserModel, TokenModel],
	synchronize: true,
});

const start = async () => {
	try {
		await appDataSource.initialize();
		app.listen(vars.PORT, () =>
			console.log(`Server has started on port ${vars.PORT}`)
		);
	} catch (e) {
		console.log(e);
	}
};

start();
