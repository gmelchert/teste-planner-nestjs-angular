import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryListComponent } from './category-list.component';
import { CardModule } from '../../../shared/components/card/card.module';
import { ButtonModule } from '../../../shared/components/button/button.module';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
  ],
  exports: [CategoryListComponent], // exporta apenas se outro módulo precisar
})
export class CategoryListModule { }
