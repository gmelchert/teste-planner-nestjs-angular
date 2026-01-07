import { ObjectLiteral, Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CategoryEntity } from './categories.entity';
import { CreateCategoryDto } from './categories.dto';

type MockRepository<T = any> = Partial<
  Record<keyof Repository<T extends ObjectLiteral ? T : any>, jest.Mock>
>;

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: MockRepository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(CategoriesService);
    repository = module.get(getRepositoryToken(CategoryEntity));
  });

  it('should create a category', async () => {
    const dto: CreateCategoryDto = {
      name: 'Sobremesas',
      description: 'Doces em geral',
    };

    repository.findOne!.mockResolvedValue(null);
    repository.create!.mockReturnValue(dto);
    repository.save!.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto);

    expect(result).toEqual({ id: 1, ...dto });
    expect(repository.create).toHaveBeenCalledWith(dto);
  });

  it('should throw ConflictException if category exists', async () => {
    repository.findOne!.mockResolvedValue({ id: 1 });

    await expect(
      service.create({
        name: 'Sobremesas',
        description: 'Teste',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw NotFoundException when not found', async () => {
    repository.findOne!.mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(
      NotFoundException,
    );
  });
});
