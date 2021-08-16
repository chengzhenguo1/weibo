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

  async findOne(userName: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ userName });
    return user;
  }

  //  注册
  async register({
    userName,
    passWord,
    cPassWord,
    nickName,
  }: RegisterDto): Promise<UserEntity> {
    if (passWord !== cPassWord) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: '两次密码不一致',
      });
    }

    const user = await this.findOne(userName);
    if (user) {
      throw new BadRequestException('用户已存在');
    }

    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(passWord, salt); // 加密密码

    const newUser = new UserEntity();
    newUser.userName = userName;
    newUser.nickName = nickName;
    newUser.passWord = hashPwd;
    newUser.salt = salt;

    const res = await this.userRepository.save(newUser);
    return res;
  }

  private buildUserRO(user: UserEntity) {
    const userRO = {
      id: user.id,
      userName: user.userName,
      nickName: user.nickName,
      role: user.role,
      sex: user.sex,
      city: user.city,
      // token: this.generateJWT(user),
    };
    return userRO;
  }
}
