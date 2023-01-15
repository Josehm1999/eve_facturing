import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
	) {}

	createUser(user: CreateUserDTO) {
		if (!user) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		const existingUser = this.userRepository.findOne({
			where: {
				username: user.username,
			},
		});

		if (existingUser) {
			throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
		}

		const newUser = this.userRepository.create(user);
		return this.userRepository.save(newUser);
	}

	getUsers(): Promise<User[]> {
		return this.userRepository.find();
	}

	getUserById(id: number): Promise<User> {
		return this.userRepository.findOneBy({ id });
	}

	deleteUserById(id: number) {
		return this.userRepository.delete({ id });
	}

	updateUser(id: number, user: UpdateUserDTO) {
        return this.userRepository.update({id}, user);
    }
}
