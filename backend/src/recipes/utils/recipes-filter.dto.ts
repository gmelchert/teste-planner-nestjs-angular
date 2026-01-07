import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { RecipeDifficulty } from './recipes.entity';
import { PaginationDto } from '../../shared/dto';
import { Type } from 'class-transformer';

export class RecipesFilterDto extends PaginationDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsEnum(RecipeDifficulty)
  @IsOptional()
  difficulty?: RecipeDifficulty;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  categoryId?: number;
}
