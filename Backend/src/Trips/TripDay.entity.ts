import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,Unique, ManyToOne, OneToMany, JoinColumn} from "typeorm"
import { Trip } from "./Trip.entity"
import { TripPlace } from "./TripPlace.entity"

@Entity('trip_days')
@Unique(['trips', 'day_number'])
export class TripDay extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number

    @ManyToOne(()=>Trip, trip => trip.days, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'trip_id' })
    trips!: Trip

    @OneToMany(()=>TripPlace, triplace => triplace.trip_day, { onDelete: 'CASCADE' })
    place!:TripPlace[]

    @Column()
    day_number!:number

    @Column({ nullable: true })
    notes!:string

}
