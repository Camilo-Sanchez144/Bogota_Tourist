import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn,ManyToOne,JoinColumn } from "typeorm";
import { TripDay } from "./TripDay.entity";
import { Place } from "../Place/Place.entity";
@Entity('trip_places')
export class TripPlace extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id!:number

    @ManyToOne(()=> TripDay, day => day.place, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'trip_day_id' })
    trip_day!:TripDay

    @Column()
    visit_order!:number

    @Column()
    planned_start!:Date

    @Column()
    planned_end!:Date

    @Column()
    estimated_duration!:Date

    @Column()
    estimated_cost!:number

    @Column({nullable: true})
    notes!:string

    @Column({default: false})
    is_visited!:boolean

    @ManyToOne(() => Place, { eager: true })
    @JoinColumn({ name: 'place_id' })
    place!: Place
}