import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeEditComponent } from './recipe-edit.component';
import { InputModule } from '../../../shared/components/input/input.module';
import { ButtonModule } from '../../../shared/components/button/button.module';
import { SelectModule } from '../../../shared/components/select/select.module';

@NgModule({
  declarations: [RecipeEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule,
    SelectModule,
  ],
})
export class RecipeEditModule { }
