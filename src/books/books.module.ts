import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Book from 'src/entities/book.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { BookExistsValidator } from './validator/book.validator';
import { IsExistsValidator } from './validator/isExists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), CategoriesModule],
  providers: [BooksService, BookExistsValidator, IsExistsValidator],
  exports: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
