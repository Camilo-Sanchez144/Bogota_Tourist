import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, ManyToOne, Entity, BaseEntity  } from "typeorm"
import User from "../User/User.entity"
import { Event } from "../Events/Event.entity"

export enum EventStatus {
    CONFIRMED = "CONFIRMED",
    PENDING = "PENDING",
    CANCELLED = "CANCELLED",
}
@Entity('eventParticipant')
export class EventParticipant extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id!:number

    @ManyToOne(() => User, user => user.eventParticipant,{ onDelete: 'CASCADE' })
    @JoinColumn({name: 'userId'})
    user!: User

    @ManyToOne(() => Event, event => event.eventParticipant, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'eventId'})
    event!: Event

    @Column({type:'enum', enum: EventStatus, default: EventStatus.CONFIRMED})
    status!:EventStatus

    @CreateDateColumn()
    created_at!:Date
}