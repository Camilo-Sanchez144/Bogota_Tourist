import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn,OneToMany, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn} from "typeorm"
import User from '../User/User.entity'
import { Comment } from "../Comments/Comments.entity";
import { Like } from "../Likes/Likes.entity";

@Entity('posts')
export class Post extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!:number;

    @ManyToOne(()=>User,(user)=>user.posts, { onDelete: 'CASCADE' })
    @JoinColumn({name:'user_id'})
    user!:User | null;

    @OneToMany(() => Comment, comment => comment.post)
    comments!: Comment[];
    
    @OneToMany(() => Like, like => like.post)
    likes!: Like[];
    
    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @Column({ default: 0 })
    likes_count!:number;

    @Column({ default: 0 })
    comments_count!:number;

    @Column({ nullable: true })
    imageUrl!:string;
    
    @Column({default : true})
    is_active!:boolean

    @CreateDateColumn()
    created_at!:Date;

    @UpdateDateColumn()
    updated_at!:Date;
}
export default Post