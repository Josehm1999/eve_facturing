import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user_profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column({ nullable: true })
  age: number
}
