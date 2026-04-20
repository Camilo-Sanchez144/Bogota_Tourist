import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne} from "typeorm"
import User from '../User/User.entity'

@Entity('user_profile')
class UserProfile extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number;

   @Column({type: 'text'})
    bio!:string;

    @Column()
    profile_picture!: string;

    @Column()
    date_of_birth!:Date

    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn({name:'user_id'})  
    user!: User;

}   
export default UserProfile
