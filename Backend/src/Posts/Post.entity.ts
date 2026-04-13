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

    @Column()
    imageUrl!:string;
    
    @Column({default : true})
    is_active!:boolean

    @CreateDateColumn()
    created_at!:Date;

    @UpdateDateColumn()
    updated_at!:Date;
}
export default Post