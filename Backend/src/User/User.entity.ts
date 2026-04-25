import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany} from "typeorm"
import UserProfile from '../UserProfile/userProfile.entity'
import Post from '../Posts/Post.entity'
import { Comment } from "../Comments/Comments.entity";
import { Like } from "../Likes/Likes.entity";
import { Trip } from "../Trips/Trip.entity";

@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({ unique: true })
    username!:string;

    @Column({ unique: true })
    email!:string;

    @Column()
    password!:string;

    @OneToMany(() => Comment, comment => comment.user)
    comments!: Comment[];
    
    @OneToMany(() => Like, like => like.user)
    likes!: Like[];

    @Column()
    first_name!:string;

    @Column()
    last_name!:string;

    @Column({ type: 'bigint' })
    cellphone!:number;

    @OneToOne(() => UserProfile, (profile) => profile.user, {
        eager: true
    })
    profile!: UserProfile

    @OneToMany(()=>Post, (post) =>post.user)
    posts!: Post[]

    @OneToMany(()=> Trip, trip => trip.user)
    trips!: Trip[]

    @CreateDateColumn()
    created_at!:Date

    @UpdateDateColumn()
    updated_at!:Date

    @Column()
    status!:Number;
}
export default User