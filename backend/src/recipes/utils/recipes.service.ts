import { Repository } from 'typeorm';

import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryEntity } from '../../categories/utils/categories.entity';
import { RecipeEntity } from './recipes.entity';
import { RecipesFilterDto } from './recipes-filter.dto';
import { CreateRecipeDto, UpdateRecipeDto } from './recipes.dto';

import { buildPaginationInfo, PaginatedResult } from '../../shared/utils';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,

    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) { }

  async findAll(
    filter: RecipesFilterDto,
  ): Promise<PaginatedResult<RecipeEntity>> {
    const {
      page,
      limit,
      search,
      difficulty,
      categoryId,
    } = filter;

    const query = this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.category', 'category');

    if (search) {
      query.andWhere(
        '(recipe.title LIKE :search OR recipe.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (difficulty) {
      query.andWhere('recipe.difficulty = :difficulty', {
        difficulty,
      });
    }

    if (categoryId) {
      query.andWhere('recipe.categoryId = :categoryId', {
        categoryId,
      });
    }

    const [rows, total] = await query
      .orderBy('recipe.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      rows,
      meta: buildPaginationInfo(page, limit, total),
    };
  }

  async findOne(id: number): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    return recipe;
  }

  async create(dto: CreateRecipeDto): Promise<RecipeEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const recipe = this.recipeRepository.create({
      ...dto,
      category,
    });

    return this.recipeRepository.save(recipe);
  }

  async update(
    id: number,
    dto: UpdateRecipeDto,
  ): Promise<RecipeEntity> {
    const recipe = await this.findOne(id);

    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: dto.categoryId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      recipe.category = category;
      recipe.categoryId = category.id;
    }

    Object.assign(recipe, dto);
    return this.recipeRepository.save(recipe);
  }

  async remove(id: number): Promise<void> {
    const recipe = await this.findOne(id);
    await this.recipeRepository.remove(recipe);
  }
}
