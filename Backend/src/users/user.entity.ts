import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne} from "typeorm"
import UserProfile from '../userProfile/UserProfile.entity'

@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    username!:String;

    @Column({ unique: true })
    email!:String;

    @Column()
    password!:String;

    @Column()
    first_name!:String;

    @Column()
    last_name!:String;

    @Column()
    cellphone!:number;

    @OneToOne(() => UserProfile, (profile) => profile.user, {
        eager: true
    })
    profile!: UserProfile

    @CreateDateColumn()
    created_at!:Date

    @UpdateDateColumn()
    updated_at!:Date

    @Column()
    status!:Number;
}
export default User