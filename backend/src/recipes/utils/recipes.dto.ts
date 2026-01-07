import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { RecipeDifficulty } from './recipes.entity';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description!: string;

  @IsString()
  @IsNotEmpty()
  ingredients!: string;

  @IsString()
  @IsNotEmpty()
  instructions!: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  preparationTime!: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  servings!: number;

  @IsEnum(RecipeDifficulty)
  difficulty!: RecipeDifficulty;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  categoryId!: number;
}

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) { }
