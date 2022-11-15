import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { DeleteCategoryDto } from './dto/deleteCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    category: CreateCategoryDto,
  ): Promise<Category | undefined> {
    let data = { name: category.name };
    return await this.categoryRepository.save(data);
  }

  async findCategory(name: string): Promise<Category | undefined> {
    return await this.categoryRepository.findOne({
      where: { name },
    });
  }

  async updateCategory(category: UpdateCategoryDto) {
    try {
      await this.categoryRepository.update(
        { id: category.id },
        { name: category.name },
      );
      return {
        error: true,
        message: 'Category updated successfully',
      };
    } catch (err) {
      throw new UnprocessableEntityException('Something went wrong');
    }
  }

  async findById(categoryId: number) {
    return await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
  }

  async deleteCategory(category: DeleteCategoryDto) {
    try {
      await this.categoryRepository.delete({ id: category.id });
      return {
        error: true,
        message: 'Category deleted successfully',
      };
    } catch (err) {
      throw new UnprocessableEntityException('Something went wrong');
    }
  }

  async getAll() {
    try {
      return await this.categoryRepository.find({
        relations: {
          book: true,
        },
      });
    } catch (err) {
      throw new UnprocessableEntityException('Something went wrong');
    }
  }
}
