import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/auth/dto/users.dto';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userDetail: UserDto, hashedPassword: string) {
    let data = {
      firstName: userDetail.firstName ? userDetail.firstName : 'anonymous',
      lastName: userDetail.lastName ? userDetail.firstName : '',
      email: userDetail.email,
      password: hashedPassword,
    };
    return await this.userRepository.save(data);
  }

  async findUser(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

}
