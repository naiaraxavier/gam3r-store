import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ProductModule, OrderModule, DbModule],
  controllers: [AppController],
})
export class AppModule {}
