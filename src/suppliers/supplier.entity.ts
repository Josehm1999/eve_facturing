import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'suppliers' })
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  ruc: string

  @Column({ unique: true })
  bussiness_name: string

  @Column({ nullable: true })
  contact_email: string

  @Column({ nullable: true })
  contact_phone: string
}
