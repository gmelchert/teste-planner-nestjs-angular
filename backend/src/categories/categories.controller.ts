import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import {
  CategoriesService,
} from './utils';

import { Public } from '../shared/decorators';
import { Ok } from '../shared/utils';
import { CategoriesFilterDto } from './utils/categories-filter.dto';
import { CreateCategoryDto, UpdateCategoryDto } from './utils/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) { }

  @Public()
  @Get()
  async findAll(
    @Query() filter: CategoriesFilterDto,
  ) {
    const data = await this.categoriesService.findAll(filter);
    return new Ok({ data, message: 'Categories retrieved successfully' });
  }

  @Public()
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const category = await this.categoriesService.findOne(id);
    return new Ok({ data: category, message: 'Category retrieved successfully' });
  }

  @Post()
  async create(
    @Body() dto: CreateCategoryDto,
  ) {
    const category = await this.categoriesService.create(dto);
    return new Ok({ data: category, message: 'Category created successfully' });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    const category = await this.categoriesService.update(id, dto);
    return new Ok({ data: category, message: 'Category updated successfully' });
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.categoriesService.remove(id);
    return new Ok({ message: 'Category deleted successfully' });
  }
}
