import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany} from "typeorm"
import UserProfile from '../UserProfile/UserProfile.entity'
import Post from '../Posts/Post.entity'
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

    @Column()
    first_name!:string;

    @Column()
    last_name!:string;

    @Column()
    cellphone!:number;

    @OneToOne(() => UserProfile, (profile) => profile.user, {
        eager: true
    })
    profile!: UserProfile

    @OneToMany(()=>Post, (post) =>post.user)
    posts!: Post[]

    @CreateDateColumn()
    created_at!:Date

    @UpdateDateColumn()
    updated_at!:Date

    @Column()
    status!:Number;
}
export default User