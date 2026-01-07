import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeListComponent } from './recipe-list.component';

import { InputModule } from '../../../shared/components/input/input.module';
import { ButtonModule } from '../../../shared/components/button/button.module';
import { CardModule } from '../../../shared/components/card/card.module';


@NgModule({
  declarations: [RecipeListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule,
    CardModule,
  ],
  exports: [RecipeListComponent],
})
export class RecipeListModule { }
