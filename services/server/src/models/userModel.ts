import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import TokenModel from './tokenModel';

@Entity('users')
class UserModel extends BaseEntity {
	@PrimaryColumn()
	login: string;

	@Column()
	password: string;

	@OneToMany(() => TokenModel, (token) => token.user)
	refreshTokens: TokenModel[];
}

export default UserModel;
