import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import Category from 'src/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryExistsValidator } from './validator/category.validator';
import { IsExistsValidator } from './validator/isExists.validator.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService, CategoryExistsValidator, IsExistsValidator],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}
