import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderPrisma } from './order.prisma';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [OrderController],
  providers: [OrderPrisma],
})
export class OrderModule {}
