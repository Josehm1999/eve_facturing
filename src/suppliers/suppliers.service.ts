import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSupplierDTO } from './dto/create-supplier.dto'
import { Supplier } from './supplier.entity'

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async createSupplier(supplier: CreateSupplierDTO) {
    if (!supplier) {
      return new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
    const supplierFound = await this.supplierRepository.findOne({
      where: [
        {
          ruc: supplier.ruc,
        },
        { bussiness_name: supplier.bussiness_name },
      ],
    })

    if (supplierFound) {
      return new HttpException(
        'RUC or Bussiness name already registered',
        HttpStatus.CONFLICT,
      )
    }

    const newSupplier = this.supplierRepository.create(supplier)
    return this.supplierRepository.save(newSupplier)
  }

  getSuppliers(): Promise<Supplier[]> {
    return this.supplierRepository.find()
  }

  getSupplier(id: number) {
    const supplierFound = this.supplierRepository.findOne({
      where: {
        id,
      },
    })

    if (!supplierFound) {
      return new HttpException(
        `Supplier with id:${id} doesn't exist`,
        HttpStatus.CONFLICT,
      )
    }

    return supplierFound
  }
}
