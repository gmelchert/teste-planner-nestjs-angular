import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryEntity } from './categories.entity';
import { CategoriesFilterDto } from './categories-filter.dto';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

import { buildPaginationInfo, PaginatedResult } from '../../shared/utils';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) { }

  async findAll(
    filter: CategoriesFilterDto,
  ): Promise<PaginatedResult<CategoryEntity>> {
    const { page, limit, search } = filter;

    const query = this.categoryRepository.createQueryBuilder('category');

    if (search) {
      query.where('category.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    const [rows, total] = await query
      .orderBy('category.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      rows,
      meta: buildPaginationInfo(page, limit, total),
    };
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const exists = await this.categoryRepository.findOne({
      where: { name: dto.name },
    });

    if (exists) {
      throw new ConflictException('Category already exists');
    }

    const category = this.categoryRepository.create(dto);
    return this.categoryRepository.save(category);
  }

  async update(
    id: number,
    dto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.findOne(id);

    Object.assign(category, dto);

    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
