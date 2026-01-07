import { ObjectLiteral, Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { RecipesService } from './recipes.service';
import { RecipeEntity, RecipeDifficulty } from './recipes.entity';
import { CategoryEntity } from '../../categories/utils/categories.entity';
import { CreateRecipeDto } from './recipes.dto';

type MockRepository<T = any> = Partial<
  Record<keyof Repository<T extends ObjectLiteral ? T : any>, jest.Mock>
>;

describe('RecipesService', () => {
  let service: RecipesService;
  let recipeRepository: MockRepository<RecipeEntity>;
  let categoryRepository: MockRepository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesService,
        {
          provide: getRepositoryToken(RecipeEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(RecipesService);
    recipeRepository = module.get(getRepositoryToken(RecipeEntity));
    categoryRepository = module.get(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should create a recipe', async () => {
    const dto: CreateRecipeDto = {
      title: 'Bolo de Chocolate',
      description: 'Delicioso',
      ingredients: 'Chocolate, farinha',
      instructions: 'Misturar tudo',
      preparationTime: 60,
      servings: 8,
      difficulty: RecipeDifficulty.EASY,
      categoryId: 1,
    };

    categoryRepository.findOne!.mockResolvedValue({ id: 1 });
    recipeRepository.create!.mockReturnValue(dto);
    recipeRepository.save!.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto);

    expect(result.id).toBe(1);
    expect(recipeRepository.create).toHaveBeenCalled();
  });

  it('should throw NotFoundException if category does not exist', async () => {
    categoryRepository.findOne!.mockResolvedValue(null);

    await expect(service.create({} as any)).rejects.toThrow(
      NotFoundException,
    );
  });
});
