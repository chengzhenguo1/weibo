import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Blog } from 'src/module/blog/blog.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ comment: '用户id' })
  id: number;

  @Column({ comment: '账号' })
  userName: string;

  @Column({ comment: '密码' })
  passWord: string;

  @Column({ comment: '用户名' })
  nickName: string;

  @Column({ comment: '密码盐' })
  salt: string;

  @CreateDateColumn({ comment: '创建时间' })
  createDate: Date;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];
}
