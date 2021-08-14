import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogEntity } from 'src/module/blog/blog.entity';

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

  @CreateDateColumn({ comment: '创建时间' })
  createDate: Date;

  @OneToMany(() => BlogEntity, (blog) => blog.user)
  blogs: BlogEntity[];
}
