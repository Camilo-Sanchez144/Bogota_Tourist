import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, Unique } from "typeorm"
import User from "../User/User.entity"

@Entity('places')
@Unique(['owner', 'name'])
export class Place extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => User, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'owner_id' })
    owner!: User

    @Column()
    name!: string

    @Column({ nullable: true })
    description?: string

    @Column({ nullable: true })
    address?: string

    @Column({ nullable: true })
    category?: string

    @CreateDateColumn()
    created_at!: Date
}