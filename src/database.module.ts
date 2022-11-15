import { TypeOrmModule } from '@nestjs/typeorm';
import Book from './entities/book.entity';
import Category from './entities/category.entity';
import Order from './entities/order.entity';
import OrderItems from './entities/orderItems.entity';
import User from './entities/user.entity';

export const typeOrmConfig: TypeOrmModule = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'zahramumtaz',
  password: 'root',
  database: 'book_shop',
  entities: [User, Book, Category, Order, OrderItems],
  synchronize: true,
};
