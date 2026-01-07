import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecipesController } from './recipes.controller';

import { RecipesService } from './utils';
import { RecipeEntity } from './utils/recipes.entity';
import { CategoryEntity } from 'src/categories/utils/categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipeEntity, CategoryEntity]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule { }
