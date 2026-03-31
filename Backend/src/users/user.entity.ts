import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm"

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

    @Column()
    bio!:String;

    @Column()
    profile_picture!: String;

    @Column()
    date_of_birth!:Date

    @CreateDateColumn()
    created_at!:Date

    @UpdateDateColumn()
    updated_at!:Date
}