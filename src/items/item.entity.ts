import { Supplier } from 'src/suppliers/supplier.entity'
import { User } from 'src/users/user.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: true })
  reference: string

  @Column()
  description: string

  @Column({ nullable: true })
  short_description: string

  @Column({ nullable: true })
  category: string

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column({ default: 0 })
  stock: number

  @Column({ nullable: true })
  unit_type: string

  @Column({ default: 1 })
  isActive: Boolean

  @OneToOne(() => Supplier, { nullable: true })
  @JoinColumn()
  supplier: Supplier

  @Column({ nullable: true })
  img_url: string

  @OneToOne(() => User, {})
  @JoinColumn()
  creation_user: User

  @OneToOne(() => User)
  @JoinColumn()
  update_user: User
}
