import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from 'src/books/books.module';
import Book from 'src/entities/book.entity';
import OrderItems from 'src/entities/orderItems.entity';
import { OrderItemsService } from './order-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItems, Book]), BooksModule],
  exports: [OrderItemsService],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}
