import { Module } from '@nestjs/common'
import { ItemsService } from './items.service'
import { ItemsController } from './items.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Item } from './item.entity'
import { SuppliersService } from 'src/suppliers/suppliers.service'
import { UsersService } from 'src/users/users.service'
import { Supplier } from 'src/suppliers/supplier.entity'
import { User } from 'src/users/user.entity'
import { Profile } from 'src/users/profile.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Item, Supplier, User, Profile])],
  providers: [ItemsService, SuppliersService, UsersService],
  controllers: [ItemsController],
})
export class ItemsModule {}
