import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogEntity } from 'src/module/blog/blog.entity';

type Role = 'admin' | 'user';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ comment: '用户id' })
  id: number;

  @Column({ comment: '用户名' })
  userName: string;

  @Column({ comment: '密码' })
  passWord: string;

  @Column({ comment: '姓名' })
  nickName: string;

  @Column({ comment: '密码盐' })
  salt: string;

  @Column({ comment: '角色 默认为user', default: 'user', length: 10 })
  role: Role;

  @CreateDateColumn({ comment: '创建时间' })
  createDate: Date;

  @OneToMany(() => BlogEntity, (blog) => blog.user)
  blogs: BlogEntity[];
}
