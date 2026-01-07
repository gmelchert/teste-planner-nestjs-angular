import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoryEditComponent } from './category-edit.component';

import { InputModule } from '../../../shared/components/input/input.module';
import { ButtonModule } from '../../../shared/components/button/button.module';

@NgModule({
  declarations: [CategoryEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule,
  ],
  exports: [CategoryEditComponent], // exporta apenas se necessário
})
export class CategoryEditModule { }
