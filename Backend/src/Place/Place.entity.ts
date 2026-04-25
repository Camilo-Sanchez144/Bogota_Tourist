import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,Unique, ManyToOne, OneToMany, JoinColumn} from "typeorm"

@Entity('places')
export class Place extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({ nullable: true })
    description?: string

    @Column({ nullable: true })
    address?: string

    @Column({ nullable: true })
    category?: string
}