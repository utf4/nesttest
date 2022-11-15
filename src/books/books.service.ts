import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import Book from 'src/entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/createBook.dto';
import { DeleteBookDto } from './dto/deleteBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { GetBooksDto } from './dto/getBooks.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private categoryService: CategoriesService,
  ) {}

  async createBook(book: CreateBookDto): Promise<Book | undefined> {
    const category = await this.categoryService.findById(book.categoryId);
    if (!category) {
      throw new UnprocessableEntityException("Category doesn't exists");
    }
    let bookDetail = {
      title: book.title ? book.title.trim() : null,
      publishedYear: book.publishedYear ? book.publishedYear : null,
      authorName: book.authorName ? book.authorName.trim() : null,
      noOfCopies: book.noOfCopies ? book.noOfCopies : null,
      price: book.price ? book.price : null,
      category: category,
    };
    return await this.bookRepository.save(bookDetail);
  }

  async findBook(title: string) {
    return await this.bookRepository.findOne({
      where: { title },
    });
  }

  async findById(bookId: number) {
    return await this.bookRepository.findOne({
      where: { id: bookId },
    });
  }

  async deleteBook(book: DeleteBookDto) {
    try {
      await this.bookRepository.delete({ id: book.id });
      return { error: false, message: 'Book deleted successfully' };
    } catch (err) {
      throw new UnprocessableEntityException('Something went wrong');
    }
  }

  async updateBook(book: UpdateBookDto) {
    try {
      let bookDetail = Object.assign({}, book);
      delete bookDetail.id;
      await this.bookRepository.update({ id: book.id }, bookDetail);
      return { error: false, message: 'Book updated successfully' };
    } catch (err) {
      throw new UnprocessableEntityException('Something went wrong');
    }
  }

  async getAll() {
    try {
      return await this.bookRepository.find({
        relations: { category: true },
      });
    } catch (err) {
      throw new UnprocessableEntityException('Something went wrong');
    }
  }

  async getAllBooks(payload: GetBooksDto) {
    const [items, count] = await this.bookRepository.findAndCount({
      relations: ['category'],
      where: { ...payload.search, soldOut: false },
      order: {
        id: 'DESC',
      },
      skip: payload.skip,
      take: payload.limit,
    });
    return { items, count };
  }

  async updateBookCount(id: number, noOfCopies: number) {
    if (noOfCopies == 0) {
      await this.bookRepository.update({ id }, { noOfCopies, soldOut: true });
    } else {
      return await this.bookRepository.update({ id }, { noOfCopies });
    }
  }
}
