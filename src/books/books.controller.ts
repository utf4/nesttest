import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import Book from 'src/entities/book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/createBook.dto';
import { DeleteBookDto } from './dto/deleteBook.dto';
import { GetBooksDto } from './dto/getBooks.dto';
import { UpdateBookDto } from './dto/updateBook.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get('/')
  async getAll(@Body() payload: GetBooksDto) {
    return this.bookService.getAllBooks(payload);
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  async create(@Body() book: CreateBookDto) {
    return await this.bookService.createBook(book);
  }

  @Put('/update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  async update(@Body() book: UpdateBookDto) {
    return await this.bookService.updateBook(book);
  }

  @Delete('/delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  async delete(@Body() book: DeleteBookDto) {
    return await this.bookService.deleteBook(book);
  }
}
