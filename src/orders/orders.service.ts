import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from 'src/books/books.service';
import Order from 'src/entities/order.entity';
import User from 'src/entities/user.entity';
import { OrderItemsService } from 'src/order-items/order-items.service';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private orderItemService: OrderItemsService,
    private bookService: BooksService,
  ) {}

  async addToCart(payload: CreateOrderDto, user: User) {
    try {
      let order = await this.createOrder(user);
      let { orderItems, totalAmount } =
        await this.orderItemService.createOrderItems(payload.orderItems, order);
      if (orderItems.length > 0) {
        await this.updateOrderAmount(order.id, totalAmount);
      }
      return orderItems;
    } catch (err) {
      throw new UnprocessableEntityException('Something went wrong');
    }
  }

  async createOrder(user: User) {
    const order = new Order();
    order.user = user;
    order.status = 'pending';
    return await this.orderRepository.save(order);
  }

  async findOrder(id: number) {
    return await this.orderRepository.findOne({
      where: { id },
    });
  }

  async updateOrderAmount(id: number, amount: number) {
    return await this.orderRepository.update({ id }, { amount });
  }

  async checkout(user: User) {
    try {
      let order = await this.getLatestOrder(user.id);
      if (!order) throw new NotFoundException('No record found');
      let timeDiff = this.getTimeDifference(order.createdAt);
      console.log(timeDiff);
      if (timeDiff >= 30) {
        let orderItem = await this.orderItemService.getOrderItems(order.id);
        for (let item of orderItem) {
          await this.bookService.updateBookCount(
            item.book.id,
            item.bookCount + item.book.noOfCopies,
          );
        }
        await this.updateOrderStatus(order.id, 'cancelled');
        throw new UnprocessableEntityException(
          'Checkout time has been expired',
        );
      }
      await this.updateOrderStatus(order.id, 'accepted');
    } catch (err) {
      throw new UnprocessableEntityException('Something went wrong');
    }
  }

  async getLatestOrder(userId: number) {
    return await this.orderRepository.findOne({
      where: { user: { id: userId }, status: 'pending' },
      order: { createdAt: 'DESC' },
    });
  }

  getTimeDifference(orderTime) {
    let createdAt = orderTime.getTime() + 5 * 60 * 60 * 1000;
    let currentTime = new Date().getTime() + 5 * 60 * 60 * 1000;
    let timeDiff = currentTime - createdAt;
    return Math.abs(Math.round(timeDiff / 60000));
  }

  async updateOrderStatus(id: number, status: string) {
    return await this.orderRepository.update({ id }, { status });
  }

  async getAllPendingOrders() {
    let currentTime = new Date();
    let timeDiff = new Date(
      currentTime.setMinutes(currentTime.getMinutes() - 30),
    );

    return await this.orderRepository.find({
      where: { status: 'pending', createdAt: LessThan(timeDiff) },
      relations: { orderItem: true },
    });
  }

  async resetCountAndOrderStatus(pendingOrders) {
    try {
      for (let order of pendingOrders) {
        for (let orderItem of order.orderItem) {
          await this.bookService.updateBookCount(
            orderItem.book.id,
            orderItem.book.noOfCopies + orderItem.bookCount,
          );
        }
        await this.updateOrderStatus(order.id, 'cancelled');
      }
      return {
        error: false,
        message: 'Update order items and status successfully',
      };
    } catch (err) {
      throw new UnprocessableEntityException(
        'Something went wrong when updating order',
      );
    }
  }
}
