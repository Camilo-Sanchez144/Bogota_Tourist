import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn, Unique, BaseEntity } from 'typeorm';

import { User } from '../User/User.entity';
import { Post } from '../Posts/Post.entity';

@Entity('likes')
@Unique(['user', 'post'])
export class Like extends BaseEntity{

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Post, post => post.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @CreateDateColumn()
  created_at!: Date;
}