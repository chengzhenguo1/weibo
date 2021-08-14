import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('blog')
export class Blog {
  @PrimaryGeneratedColumn({ comment: '文章名' })
  id: number;

  @Column({ comment: '文章标题' })
  title: string;

  @Column({ type: 'text', comment: '文章内容' })
  content: string;

  @Column({ comment: '创建人' })
  createBy: string;

  @CreateDateColumn({ comment: '创建时间' })
  createDate: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updateDate: Date;

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;
}
