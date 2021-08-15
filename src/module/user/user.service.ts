import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseRO } from 'src/shared/interface/response.interface';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { RegisterDTO } from './dto/userDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  //  注册
  async register(body: RegisterDTO): Promise<any> {
    try {
      const res = await this.userRepository.save(body);
      return res;
    } catch (error) {}
  }
}
