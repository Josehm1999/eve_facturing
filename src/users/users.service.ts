import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateProfileDTO } from './dto/create-profile.dto'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { Profile } from './profile.entity'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async createUser(user: CreateUserDTO) {
    if (!user) {
      return new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }

    const userFound = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    })

    if (userFound) {
      return new HttpException('User already exists', HttpStatus.CONFLICT)
    }

    const newUser = this.userRepository.create(user)
    return this.userRepository.save(newUser)
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  async getUserById(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    })

    if (!userFound) {
      return new HttpException(
        `User with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      )
    }
    return userFound
  }

  async deleteUserById(id: number) {
    const result = await this.userRepository.delete({ id })
    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return this.userRepository.delete({ id })
  }

  async updateUser(id: number, user: UpdateUserDTO) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    })

    if (!userFound) {
      return new HttpException(
        `User with ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      )
    }

    const updatedUser = Object.assign(userFound, user)
    return this.userRepository.save(updatedUser)
  }

  async createProfile(id: number, profile: CreateProfileDTO) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    })

    if (!userFound) {
      return new HttpException(
        `User with ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      )
    }

    const newProfile = this.profileRepository.create(profile)
    const savedProfile = await this.profileRepository.save(newProfile)

    userFound.profile = savedProfile

    return this.userRepository.save(userFound)
  }
}
