import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriesComponent } from './categories.component';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListModule } from './category-list/category-list.module';
import { CategoryEditModule } from './category-edit/category-edit.module';
import { CardModule } from '../../shared/components/card/card.module';
import { InputModule } from '../../shared/components/input/input.module';
import { ButtonModule } from '../../shared/components/button/button.module';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    CategoryListModule,
    CategoryEditModule,
    ReactiveFormsModule,
    CardModule,
    InputModule,
    ButtonModule,
  ],
})
export class CategoriesModule { }
