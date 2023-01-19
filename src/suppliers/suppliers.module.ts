import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Supplier } from './supplier.entity'
import { SuppliersController } from './suppliers.controller'
import { SuppliersService } from './suppliers.service'

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  providers: [SuppliersService],
  controllers: [SuppliersController],
})
export class SuppliersModule {}
