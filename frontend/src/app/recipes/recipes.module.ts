import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';

import { InputModule } from '../shared/components/input/input.module';
import { ButtonModule } from '../shared/components/button/button.module';
import { CardModule } from '../shared/components/card/card.module';
import { SelectModule } from '../shared/components/select/select.module';

@NgModule({
  declarations: [RecipesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    InputModule,
    ButtonModule,
    CardModule,
    SelectModule,
  ],
})
export class RecipesModule { }
