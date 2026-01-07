import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeDetailRoutingModule } from './recipe-detail-routing.module';

import { ButtonModule } from '../shared/components/button/button.module';
import { CardModule } from '../shared/components/card/card.module';
import { RecipeDetailComponent } from './recipe-detail.component';

@NgModule({
  declarations: [RecipeDetailComponent],
  imports: [
    CommonModule,
    RecipeDetailRoutingModule,
    CardModule,
    ButtonModule,
  ],
})
export class RecipeDetailModule { }
