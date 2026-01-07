import { IsOptional, IsString } from 'class-validator';

import { PaginationDto } from '../../shared/dto';

export class CategoriesFilterDto extends PaginationDto {
  @IsString()
  @IsOptional()
  search?: string;
}
