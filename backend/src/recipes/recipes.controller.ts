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
  RecipesService,
} from './utils';

import { Public } from '../shared/decorators';
import { Ok } from '../shared/utils';
import { RecipesFilterDto } from './utils/recipes-filter.dto';
import { CreateRecipeDto, UpdateRecipeDto } from './utils/recipes.dto';

@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly recipesService: RecipesService,
  ) { }

  @Public()
  @Get()
  async findAll(
    @Query() filter: RecipesFilterDto,
  ) {
    const data = await this.recipesService.findAll(filter);
    return new Ok({ data, message: 'Recipes retrieved successfully' });
  }

  @Public()
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const recipe = await this.recipesService.findOne(id);
    return new Ok({ data: recipe, message: 'Recipe retrieved successfully' });
  }

  @Post()
  async create(
    @Body() dto: CreateRecipeDto,
  ) {
    const recipe = await this.recipesService.create(dto);
    return new Ok({ data: recipe, message: 'Recipe created successfully' });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRecipeDto,
  ) {
    const recipe = await this.recipesService.update(id, dto);
    return new Ok({ data: recipe, message: 'Recipe updated successfully' });
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.recipesService.remove(id);
    return new Ok({ message: 'Recipe deleted successfully' });
  }
}
