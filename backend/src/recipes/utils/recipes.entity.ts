import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from '../../categories/utils/categories.entity';

export enum RecipeDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

@Entity({ name: 'recipes' })
@Index('IDX_RECIPE_CREATED_AT', ['createdAt'])
@Index('IDX_RECIPE_CATEGORY', ['categoryId'])
@Index('IDX_RECIPE_DIFFICULTY', ['difficulty'])
@Index('IDX_RECIPE_CATEGORY_CREATED_AT', ['categoryId', 'createdAt'])
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 150 })
  title!: string;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @Column({ type: 'text' })
  ingredients!: string;

  @Column({ type: 'text' })
  instructions!: string;

  @Column({ type: 'int', name: 'preparation_time' })
  preparationTime!: number;

  @Column({ type: 'int' })
  servings!: number;

  @Column({
    type: 'enum',
    enum: RecipeDifficulty,
  })
  difficulty!: RecipeDifficulty;

  @Column({ name: 'category_id' })
  categoryId!: number;

  @ManyToOne(() => CategoryEntity, (category) => category.recipes, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
