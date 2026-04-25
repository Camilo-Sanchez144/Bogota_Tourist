import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm"
import User from "../User/User.entity";
import { TripDay } from "./TripDay.entity";

export enum TripStatus {
    PLANNED = "PLANEADO",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED",
}

@Entity('trips')
export class Trip extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number;
    
    @ManyToOne(() => User, user => user.trips, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'userId'})
    user!:User
    
    @Column('text')
    title!:string

    @Column('text')
    description!:string

    @Column({ type: 'timestamp' })
    start_date!:Date

    @Column({ type: 'timestamp' })
    end_date!:Date

    @Column()
    number_of_people!:number
    
    @Column()
    total_budget!:number

    @Column({default:true})
    is_public!:boolean
    
    @Column({type:'enum', enum: TripStatus, default: TripStatus.PLANNED})
    status!:TripStatus

    @OneToMany(()=>TripDay, day => day.trips)
    days!:TripDay[]

    @CreateDateColumn()
    created_at!:Date

    @UpdateDateColumn()
    updated_at!:Date
}