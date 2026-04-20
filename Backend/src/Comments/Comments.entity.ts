import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany,CreateDateColumn,UpdateDateColumn,JoinColumn, BaseEntity } from 'typeorm';

import { User } from '../User/User.entity';
import { Post } from '../Posts/Post.entity';

@Entity('comments')
export class Comment extends BaseEntity{

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.comments, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => Comment, comment => comment.replies, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent!: Comment | null;

  @OneToMany(() => Comment, comment => comment.parent)
  replies!: Comment[];

  @Column('text')
  content!: string;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}