import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateSupplierDTO } from './dto/create-supplier.dto'
import { SuppliersService } from './suppliers.service'

@Controller('suppliers')
export class SuppliersController {
  constructor(private supplierService: SuppliersService) {}

  @Post()
  createSupplier(@Body() newSupplier: CreateSupplierDTO) {
    return this.supplierService.createSupplier(newSupplier)
  }

  @Get()
  getSuppliers() {
    return this.supplierService.getSuppliers()
  }

}
