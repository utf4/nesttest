import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import Category from 'src/entities/category.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { DeleteCategoryDto } from './dto/deleteCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  async getAll(): Promise<Category[] | undefined> {
    return await this.categoryService.getAll();
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  async create(@Body() category: CreateCategoryDto) {
    return await this.categoryService.createCategory(category);
  }

  @Put('/update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  async update(@Body() category: UpdateCategoryDto) {
    return await this.categoryService.updateCategory(category);
  }

  @Delete('/delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  async delete(@Body() category: DeleteCategoryDto) {
    return await this.categoryService.deleteCategory(category);
  }
}
