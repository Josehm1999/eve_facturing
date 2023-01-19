import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Supplier } from 'src/suppliers/supplier.entity'
import { User } from 'src/users/user.entity'
import { Repository } from 'typeorm'
import { CreateItemDTO } from './dto/create-item.dto'
import { UpdateItemDTO } from './dto/update-item.dto'
import { Item } from './item.entity'

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  async createItem(user_id: number, item: CreateItemDTO) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    })

    if (!userFound) {
      return new HttpException(
        `User with id: ${user_id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      )
    }

    const supplierFound = await this.supplierRepository.findOne({
      where: {
        id: item.supplier_id,
      },
    })

    if (!item) {
      return new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }

    const itemFound = await this.itemRepository.findOne({
      where: {
        reference: item.reference,
      },
    })

    if (itemFound) {
      return new HttpException('Item already exists', HttpStatus.CONFLICT)
    }

    const newItem = this.itemRepository.create(item)
    newItem.creation_user = userFound
    newItem.update_user = userFound
    if (supplierFound) {
      newItem.supplier = supplierFound
    }

    return this.itemRepository.save(newItem)
  }

  getItems(): Promise<Item[]> {
    return this.itemRepository.find({
      where: {
        isActive: true,
      },
    })
  }

  async getItem(id: number) {
    const itemFound = await this.itemRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    })

    if (!itemFound) {
      return new HttpException(
        `Item with ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      )
    }
    return itemFound
  }

  async deleteItem(id: number) {
    const itemFound = await this.itemRepository.findOne({
      where: {
        id,
      },
    })

    if (!itemFound) {
      return new HttpException(
        `Item with id:${id} doens't exist`,
        HttpStatus.NOT_FOUND,
      )
    }

    itemFound.isActive = false
    return this.itemRepository.save(itemFound)
  }

  async updateItem(user_id: number, id: number, item: UpdateItemDTO) {
    const itemFound = await this.itemRepository.findOne({
      where: {
        id,
      },
    })

    if (!itemFound) {
      return new HttpException(
        `Item with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      )
    }

    const userFound = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    })

    if (!userFound) {
      return new HttpException(
        `User with id: ${user_id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      )
    }

    const supplierFound = await this.supplierRepository.findOne({
      where: {
        id: item.supplier_id,
      },
    })

    itemFound.update_user = userFound
    itemFound.updatedAt = new Date()

    if (supplierFound) {
      itemFound.supplier = supplierFound
    }

    const updatedItem = Object.assign(itemFound, item)
    return this.itemRepository.save(updatedItem)
  }
}
