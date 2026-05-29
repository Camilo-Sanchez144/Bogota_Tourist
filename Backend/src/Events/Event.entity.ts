import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, Entity, ManyToOne, JoinColumn } from "typeorm";
import { EventParticipant } from "../EventParticipant/EventParticipant.entity";
import User from "../User/User.entity";

@Entity('events')
export class Event extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    title!:string

    @Column()
    description!:string

    @Column({type: 'text'})
    location!:string

    @Column()
    date!:Date

    @Column()
    max_people!:number

    @Column()
    current_people!:number

    @Column()
    price!:number

    @Column()
    is_active!:boolean

    @ManyToOne(() => User, user => user.events, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user!: User;

    @OneToMany(()=>EventParticipant, ep => ep.event)
    eventParticipant!:EventParticipant[]

    @CreateDateColumn()
    created_at!:Date
}