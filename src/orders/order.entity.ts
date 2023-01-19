import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { User } from 'src/users/user.entity'

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => User)
  @JoinColumn()
  buyer: User

  @Column({ default: 1 })
  quantity: number

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  order_date: Date

  @Column({ default: 'PEN' })
  currency: string

  @Column({ type: 'decimal', precision: 12, scale: 4 })
  gross_value: number
}
