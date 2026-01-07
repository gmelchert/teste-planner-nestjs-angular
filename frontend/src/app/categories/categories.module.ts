import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesComponent } from './categories.component';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CardModule } from '../shared/components/card/card.module';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    CardModule,
  ],
})
export class CategoriesModule { }
