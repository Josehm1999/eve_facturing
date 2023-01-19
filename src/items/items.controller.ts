import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateItemDTO } from './dto/create-item.dto'
import { UpdateItemDTO } from './dto/update-item.dto'
import { ItemsService } from './items.service'

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @Post()
  createItem(
    @Body('user_id') user_id: number,
    @Body('Item') newItem: CreateItemDTO,
  ) {
    return this.itemService.createItem(user_id, newItem)
  }

  @Get()
  getItems() {
    return this.itemService.getItems()
  }

  @Get(':id')
  getItem(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.getItem(id)
  }

  @Delete(':id')
  deleteItem(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.deleteItem(id)
  }

  @Patch(':id')
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body('user_id') user_id: number,
    @Body() item: UpdateItemDTO,
  ) {
    return this.itemService.updateItem(user_id, id, item)
  }
}
