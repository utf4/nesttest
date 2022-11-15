import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { BooksService } from 'src/books/books.service';
import { Roles } from 'src/common/decorator/role.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private orderService: OrdersService,
    private bookService: BooksService,
  ) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['user'])
  async create(@Req() request, @Body() order: CreateOrderDto) {
    return await this.orderService.addToCart(order, request.user);
  }

  @Post('/checkout')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['user'])
  async checkout(@Req() request) {
    return await this.orderService.checkout(request.user);
  }

  @Post('/cronPendingOrder')
  async pendingOrder(@Req() request) {
    let pendingOrders = await this.orderService.getAllPendingOrders();
    if (pendingOrders.length > 0) {
      return this.orderService.resetCountAndOrderStatus(pendingOrders);
    } else {
      throw new NotFoundException('No Pending orders found');
    }
  }
}
