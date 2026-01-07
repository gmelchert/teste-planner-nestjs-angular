import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RecipeEntity } from '../../recipes/utils/recipes.entity';

@Entity({ name: 'categories' })
@Index('IDX_CATEGORY_NAME', ['name'])
@Index('IDX_CATEGORY_CREATED_AT', ['createdAt'])
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @OneToMany(() => RecipeEntity, (recipe) => recipe.category)
  recipes!: RecipeEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
