import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesComponent } from './recipes.component';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeListModule } from './recipes-list/recipe-list.module';
import { RecipeEditModule } from './recipes-edit/recipe-edit.module';

@NgModule({
  declarations: [RecipesComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    RecipeListModule,
    RecipeEditModule,
  ],
})
export class RecipesModule { }
