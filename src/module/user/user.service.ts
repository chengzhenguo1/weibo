import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { RegisterDto } from './dto/userDto';
import { UserRo } from './user.interface';
import { encryptPassword, makeSalt } from 'src/shared/utils/cryptogram';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserInfo(userName: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ userName });
    return user;
  }

  //  注册
  async createUser({
    userName,
    passWord,
    cPassWord,
  }: RegisterDto): Promise<UserEntity> {
    if (passWord !== cPassWord) {
      throw new BadRequestException({
        code: HttpStatus.BAD_REQUEST,
        message: '两次密码不一致',
      });
    }

    const user = await this.getUserInfo(userName);
    if (user) {
      throw new BadRequestException({
        code: HttpStatus.BAD_REQUEST,
        message: '用户名已存在',
      });
    }

    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(passWord, salt); // 加密密码

    const newUser = new UserEntity();
    newUser.userName = userName;
    newUser.nickName = userName;
    newUser.passWord = hashPwd;
    newUser.salt = salt;

    const res = await this.userRepository.save(newUser);
    return res;
  }
}
