import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from 'src/books/books.service';
import Book from 'src/entities/book.entity';
import Order from 'src/entities/order.entity';
import OrderItems from 'src/entities/orderItems.entity';
import User from 'src/entities/user.entity';
import { CreateOrderDto } from 'src/orders/dto/createOrder.dto';
import { OrderItemsDto } from 'src/orders/dto/orderItems.dto';
import { OrdersService } from 'src/orders/orders.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItems)
    @InjectRepository(Book)
    private orderItemRepository: Repository<OrderItems>,
    private bookService: BooksService,
  ) {}

  async createOrderItems(payload: OrderItemsDto[], order: Order) {
    let itemDetails = [];
    let bookDetails = [];
    let totalAmount = 0;
    for (let item of payload) {
      let book = await this.bookService.findById(item.bookId);
      if (book && book.noOfCopies >= item.bookCount) {
        book.noOfCopies = book.noOfCopies - item.bookCount;
        await this.bookService.updateBookCount(book.id, book.noOfCopies);
        const orderItem = new OrderItems();
        orderItem.bookCount = item.bookCount;
        orderItem.totalAmount = book.price * item.bookCount;
        orderItem.book = book;
        orderItem.order = order;
        totalAmount += orderItem.totalAmount;
        itemDetails.push(orderItem);
      }
    }
    let orderItems = await this.orderItemRepository.save(itemDetails);
    return { orderItems, totalAmount };
  }

  async getOrderItems(orderId: number) {
    return this.orderItemRepository.find({
      relations: { book: true },
      where: { order: { id: orderId } },
    });
  }
}
