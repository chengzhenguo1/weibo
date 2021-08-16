import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BlogEntity } from 'src/module/blog/blog.entity';

export type Role = 'admin' | 'user';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ comment: '用户id' })
  id: number;

  @Column({ unique: true, comment: '用户名' })
  userName: string;

  @Column({ comment: '密码' })
  passWord: string;

  @Column({ unique: true, comment: '姓名' })
  nickName: string;

  @Column({ comment: '密码盐' })
  salt: string;

  @Column({
    type: 'decimal',
    default: '0',
    comment: '性别 0:未知, 1:男, 2: 女',
  })
  sex: number;

  @Column({ comment: '城市', length: 20, nullable: true })
  city: string;

  @Column({
    default: 'user',
    length: 10,
    comment: '角色 默认为user',
  })
  role: Role;

  @CreateDateColumn({ comment: '创建时间' })
  createDate: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  upDate: Date;

  @OneToMany(() => BlogEntity, (blog) => blog.user)
  blogs: BlogEntity[];
}
