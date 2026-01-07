import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../shared/models/recipe.model';
import { RecipesService } from '../shared/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  standalone: false,
})
export class RecipeDetailComponent implements OnInit {
  recipe = signal<Recipe | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error.set('Receita inválida');
      return;
    }
    this.loadRecipe(id);
  }

  loadRecipe(id: number): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.recipesService.getById(id)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: ({ data }) => {
          this.recipe.set({
            ...data,
            instructions: (data.instructions as string).split('\n'),
            ingredients: (data.ingredients as string).split('\n'),
          });
        },
        error: () => this.error.set('Erro ao carregar receita'),
      });
  }

  goBack(): void {
    this.router.navigate(['/recipes']);
  }
}
