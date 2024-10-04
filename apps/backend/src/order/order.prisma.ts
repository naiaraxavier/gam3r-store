import { PrismaProvider } from '../db/prisma.provider';
import { Injectable } from '@nestjs/common';
import { Order } from '@gstore/core';

@Injectable()
export class OrderPrisma {
  constructor(private readonly prisma: PrismaProvider) {}

  async get(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany();
    return orders as any;
  }

  async getById(id: number): Promise<Order[]> {
    const orders = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: { select: { id: true, name: true } } },
        },
        delivery: true,
      },
    });
    return orders as any;
  }

  async save(order: Order): Promise<void> {
    await this.prisma.order.create({
      data: {
        date: order.date,
        status: order.status,
        totalValue: order.totalValue,
        paymentMethod: order.paymentMethod,
        delivery: { create: { ...order.delivery } },
        items: {
          create: order.items.map((item) => ({
            productId: item.product.id,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
          })),
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) return;
    await this.prisma.$transaction([
      this.prisma.itemOrder.deleteMany({ where: { orderId: id } }),
      this.prisma.order.delete({ where: { id } }),
      this.prisma.orderDelivery.delete({ where: { id: order.deliveryId } }),
    ]);
  }
}
