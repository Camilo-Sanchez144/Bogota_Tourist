import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne} from "typeorm"
import User from '../User/User.entity'

@Entity('user_profile')
class UserProfile extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:Number;

   @Column({type: 'text'})
    bio!:String;

    @Column()
    profile_picture!: String;

    @Column()
    date_of_birth!:Date

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn({name:'user_id'})  
    user!: User;

}   
export default UserProfile
