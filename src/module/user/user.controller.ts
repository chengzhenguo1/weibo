import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseRO } from 'src/interface/response.interface';
import { RegisterDTO } from './dto/userDto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() body: RegisterDTO): Promise<ResponseRO> {
    console.log('fangwenle');
    return this.userService.register(body) as any;
  }
}
