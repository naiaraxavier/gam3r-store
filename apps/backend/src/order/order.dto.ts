import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  IsEnum,
  ArrayMinSize,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod, Status } from '@gstore/core';

class ProductDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  videoReview?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsNumber()
  basePrice?: number;

  @IsOptional()
  @IsNumber()
  promotionalPrice?: number;

  @IsOptional()
  @IsNumber()
  lowestPrice?: number;

  @IsOptional()
  @IsNumber()
  highestPrice?: number;

  @IsOptional()
  @IsNumber()
  averagePrice?: number;

  @IsOptional()
  @IsNumber()
  note?: number;

  @IsOptional()
  @IsObject()
  specifications?: Record<string, any>;
}

class OrderedItemDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ProductDTO)
  product: ProductDTO;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;
}

class DeliveryDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  complement: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;
}

export class OrderDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  totalValue: number;

  @IsEnum(Status)
  status: Status;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DeliveryDTO)
  delivery: DeliveryDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderedItemDTO)
  @ArrayMinSize(1)
  items: OrderedItemDTO[];
}
