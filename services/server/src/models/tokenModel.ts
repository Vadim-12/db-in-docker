import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import UserModel from './userModel';

@Entity('tokens')
class TokenModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => UserModel, (user) => user.refreshTokens, {
		cascade: true,
	})
	user: UserModel;

	@Column()
	refreshToken: string;
}

export default TokenModel;
