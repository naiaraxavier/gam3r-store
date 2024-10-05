import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { OrderPrisma } from './order.prisma';
import { Order, OrderedItem } from '@gstore/core';
import { OrderDTO } from './order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly repo: OrderPrisma) {}

  @Post()
  async save(@Body() orderDto: OrderDTO) {
    try {
      const order: Order = {
        id: undefined,
        date: orderDto.date,
        totalValue: orderDto.totalValue,
        paymentMethod: orderDto.paymentMethod,
        status: orderDto.status,
        delivery: {
          id: undefined,
          ...orderDto.delivery,
        },
        items: orderDto.items.map((item) => ({
          ...item,
          product: item.product,
        })) as unknown as OrderedItem[],
      };

      const savedOrder = await this.repo.save(order);
      return savedOrder;
    } catch (e) {
      console.error('Error saving order:', e);
      throw new HttpException(
        'Error saving order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getOrder() {
    return this.repo.get();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.repo.getById(+id);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.repo.delete(+id);
  }
}
