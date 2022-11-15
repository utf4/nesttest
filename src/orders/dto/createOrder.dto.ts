import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import OrderItems from 'src/entities/orderItems.entity';
import { OrderItemsDto } from './orderItems.dto';

export class CreateOrderDto {
  @IsInt()
  @IsOptional()
  userId: number;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @Type(() => OrderItemsDto)
  orderItems: OrderItemsDto[];
}
