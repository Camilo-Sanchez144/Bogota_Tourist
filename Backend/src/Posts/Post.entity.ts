import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn} from "typeorm"
import User from '../User/User.entity'

@Entity('posts')
export class Post extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!:number;

    @ManyToOne(()=>User,(user)=>user.posts)
    @JoinColumn({name:'user_id'})
    user!:User;
    
    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    rating!:number;

    @Column()
    likes_count!:number;

    @Column()
    comments_count!:number;

    @Column({default : true})
    is_active!:boolean

    @Column()
    created_at!:Date;

    @Column()
    updated_at!:Date;
}
export default Post